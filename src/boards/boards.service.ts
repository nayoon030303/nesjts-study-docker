import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { BoardEntity } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async getAllBoards(): Promise<BoardEntity[]> {
    return await this.boardRepository.find();
  }

  async getBoardById(id: number): Promise<BoardEntity> {
    return await this.boardRepository.findOneBy({ id });
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const { title, description } = createBoardDto;
    const newBoard = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLLIC,
    });

    this.boardRepository.save(newBoard);
    return newBoard;
  }

  async updateBoardStatus(
    id: number,
    status: BoardStatus,
  ): Promise<BoardEntity> {
    const board = await this.boardRepository.findOneBy({ id });
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
