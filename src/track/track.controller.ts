import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { readFile } from 'fs';
import { join } from 'path';

type getServiceParams = {
  id: string;
};

@Controller('track')
export class TrackController {
  @Get(':id')
  getService(@Param() params: getServiceParams) {
    const { id } = params;

    const configPath = join(process.cwd(), 'config.json');

    console.log(configPath);

    readFile(configPath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        throw new HttpException('File read failed', HttpStatus.BAD_REQUEST);
      }

      console.log(JSON.parse(data));
    });

    return {
      status: 'okay',
      service: id,
    };
  }
}
