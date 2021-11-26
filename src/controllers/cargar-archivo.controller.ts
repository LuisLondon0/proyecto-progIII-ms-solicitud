import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as llaves} from '../config/keys';
import {ResultadoEvaluacionRepository, SolicitudRepository, TipoSolicitudRepository} from '../repositories';

//@authenticate("admin")
export class CargarArchivoController {
  constructor(
    @repository(SolicitudRepository)
    private solicitudRepository: SolicitudRepository,
    @repository(TipoSolicitudRepository)
    private tipoSolicitudRepository: TipoSolicitudRepository,
    @repository(ResultadoEvaluacionRepository)
    private resultadoEvaluacionRepository: ResultadoEvaluacionRepository,
  ) { }



  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarArchivoZip/{solicitudId}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de archivo zip de una solicitud.',
      },
    },
  })
  async cargarArchivoZip(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("solicitudId") solicitudId: number
  ): Promise<object | false> {
    const rutaArchivoZip = path.join(__dirname, llaves.carpetaArchivoZip);
    let res = await this.StoreFileToPath(rutaArchivoZip, llaves.nombreCampoArchivoZip, request, response, llaves.extensionesPermitidasZip);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let data = {
          archivoZip: nombre_archivo
        }
        await this.solicitudRepository.updateById(solicitudId, data);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  @post('/CargaFormato/{tipoSolicitudId}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de formatos al tipo de solicitud.',
      },
    },
  })
  async CargaFormato(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("tipoSolicitudId") tipoSolicitudId: number
  ): Promise<object | false> {
    const rutaFormato = path.join(__dirname, llaves.carpetaFormatos);
    let res = await this.StoreFileToPath(rutaFormato, llaves.nombreCampoFormato, request, response, llaves.extensionesPermitidasFormato);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let data = {
          formato: nombre_archivo
        }
        await this.tipoSolicitudRepository.updateById(tipoSolicitudId, data);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  @post('/CargaFormatoDiligenciado/{resultadoEvaluacionId}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de formato diligenciado a la respuesta.',
      },
    },
  })
  async CargaFormatoDiligenciado(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("resultadoEvaluacionId") resultadoEvaluacionId: number
  ): Promise<object | false> {
    const rutaFormatoDiligenciado = path.join(__dirname, llaves.carpetaFormatosDiligenciados);
    let res = await this.StoreFileToPath(rutaFormatoDiligenciado, llaves.nombreCampoFormatoDiligenciado, request, response, llaves.extensionesPermitidasFormatoDiligenciado);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let data = {
          formatoDiligenciado: nombre_archivo
        }
        await this.resultadoEvaluacionRepository.updateById(resultadoEvaluacionId, data);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */


  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}
