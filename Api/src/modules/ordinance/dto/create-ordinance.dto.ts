import { IsBoolean, IsMongoId } from 'class-validator';

export class CreateOrdinanceDto {

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