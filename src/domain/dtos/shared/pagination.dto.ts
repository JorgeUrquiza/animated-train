

export class PaginationDto {

    constructor(
        public readonly page: number,
        public readonly limit: number
    ){}

    static create( page: number = 1, limit: number = 10 ): [string?, PaginationDto?] {

        if( isNaN(page) || isNaN(limit) ) return ['Invalid data type']; // si page o limit no son números, devolver un error

        if( page <= 0 ) return ['Page must be greater than 0']; // si page es menor o igual a 0, devolver un error
        if( limit <= 0 ) return ['Limit must be greater than 0']; // si limit es menor o igual a 0, devolver un error

        return[ undefined, new PaginationDto(page, limit) ] // undefined por que no hay error, y el objeto PaginationDto

    }

}