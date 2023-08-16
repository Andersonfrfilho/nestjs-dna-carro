import { IsString } from 'class-validator';

export class AddressFindGeocodingControllerParamsDTO {
  @IsString()
  address: string;
}
