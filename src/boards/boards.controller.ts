import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Promise<BoardEntity[]> {
    return this.boardsService.getAllBoards();
  }

  @Get(':id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<BoardEntity> {
    return this.boardsService.getBoardById(id);
  }

  @Delete(':id')
  deleteBoardById(@Param('id', ParseIntPipe) id: number): void {
    this.boardsService.deleteBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch(':id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<BoardEntity> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
