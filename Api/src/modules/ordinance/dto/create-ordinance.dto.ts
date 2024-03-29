import { IsBoolean } from 'class-validator';

export class CreateOrdinanceDto {

    @IsBoolean()
    Baptism: boolean;

    @IsBoolean()
    AaronicPriesthood: boolean;
    
    @IsBoolean()
    PriestHood: boolean;
    
    @IsBoolean()
    Initiatory: boolean;
    
    @IsBoolean()
    Endowment: boolean;
    
    @IsBoolean()
    Sealing: boolean;
}