import { IsBoolean, IsMongoId } from 'class-validator';

export class UpdateOrdinanceDto {

    @IsBoolean()
    Baptism: boolean;
    
    @IsBoolean()
    PriestHood: boolean;
    
    @IsBoolean()
    Initiatory: boolean;
    
    @IsBoolean()
    Endowment: boolean;
    
    @IsBoolean()
    Sealing: boolean;
    
}