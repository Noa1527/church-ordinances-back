import { IsInt, Max, Min } from 'class-validator';

export class ConfigureTeamsDto {
  @IsInt()
  @Min(1)
  @Max(30)
  maxTeams: number;
}
