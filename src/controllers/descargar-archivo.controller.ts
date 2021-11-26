import {inject} from '@loopback/core';
import {
  get,
  HttpErrors, oas,
  param,
  Response,
  RestBindings
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {Keys as llaves} from '../config/keys';

const readdir = promisify(fs.readdir);

//@authenticate("admin", "jury")
export class DescargarArchivoController {

  constructor(
  ) { }

  /**
   *
   * @param type
   * @param id
   */
  @get('/archivosZip', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listarArchivos(): Promise<Object[]> {
    //const rutaCarpeta = this.ObtenerRutaDeCarpetaPorTipo(type);
    const rutaArchivoZip = path.join(__dirname, llaves.carpetaArchivoZip);
    const archivos = await readdir(rutaArchivoZip);
    return archivos;
  }

  @get('/formatosDiligenciados', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listarFormatosDiligenciados(): Promise<Object[]> {
    //const rutaCarpeta = this.ObtenerRutaDeCarpetaPorTipo(type);
    const rutaFormatoDiligenciado = path.join(__dirname, llaves.carpetaFormatosDiligenciados);
    const formatosDiligenciados = await readdir(rutaFormatoDiligenciado);
    return formatosDiligenciados;
  }

  @get('/formatos', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listarFormatos(): Promise<Object[]> {
    //const rutaCarpeta = this.ObtenerRutaDeCarpetaPorTipo(type);
    const rutaFormato = path.join(__dirname, llaves.carpetaFormatos);
    const formatos = await readdir(rutaFormato);
    return formatos;
  }

  /**
   *
   * @param type
   * @param recordId
   * @param response
   */
  @get('/archivoZip/{filename}')
  @oas.response.file()
  async descargarArchivoZip(
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    //const rutaCarpeta = this.ObtenerRutaDeCarpetaPorTipo(type);
    const rutaArchivoZip = path.join(__dirname, llaves.carpetaArchivoZip);
    const archivo = this.ValidarNombreArchivo(rutaArchivoZip, filename);
    response.download(archivo, rutaArchivoZip);
    return response;
  }

  @get('/formatosDiligenciados/{filename}')
  @oas.response.file()
  async descargarFormatoDiligenciado(
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    //const rutaCarpeta = this.ObtenerRutaDeCarpetaPorTipo(type);
    const rutaFormatoDiligenciado = path.join(__dirname, llaves.carpetaFormatosDiligenciados);
    const formatoDiligenciado = this.ValidarNombreArchivo(rutaFormatoDiligenciado, filename);
    response.download(formatoDiligenciado, rutaFormatoDiligenciado);
    return response;
  }

  @get('/formatos/{filename}')
  @oas.response.file()
  async descargarFormato(
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    //const rutaCarpeta = this.ObtenerRutaDeCarpetaPorTipo(type);
    const rutaFormato = path.join(__dirname, llaves.carpetaFormatos);
    const formato = this.ValidarNombreArchivo(rutaFormato, filename);
    response.download(formato, rutaFormato);
    return response;
  }

  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  private ObtenerRutaDeCarpetaPorTipo(type: number) {
    let ruta = '';
    switch (type) {
      case 1:
        ruta = path.join(__dirname, llaves.carpetaArchivoZip);
        break;

      /*case 2:
        ruta = path.join(__dirname, llaves.carpetaDocumentoPersona);*/
    }
    return ruta;
  }


  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private ValidarNombreArchivo(folder: string, filename: string) {
    const resolved = path.resolve(folder, filename);
    if (resolved.startsWith(folder)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors[400](`La ruta del archivo es inválida: ${filename}`);
  }

}
