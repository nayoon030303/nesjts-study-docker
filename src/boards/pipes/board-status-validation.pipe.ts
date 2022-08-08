import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  private readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PRIVATE];

  transform(value: any) {
    value = value.toUpperCase();

    if (this.isStatusValue(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }

  private isStatusValue(status: any): boolean {
    const index = this.StatusOption.indexOf(status);
    return index == -1;
  }
}
