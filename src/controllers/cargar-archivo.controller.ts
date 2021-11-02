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
import {SolicitudRepository} from '../repositories';

export class CargarArchivoController {
  constructor(
    @repository(SolicitudRepository)
    private solicitudRepository: SolicitudRepository
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
