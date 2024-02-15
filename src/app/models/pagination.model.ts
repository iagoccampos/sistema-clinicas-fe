import { MatPaginator } from '@angular/material/paginator'

export interface IPaginationQuery {
	page?: number
	size?: number
}

export class Paginator implements IPaginationQuery {
	readonly page?: number
	readonly size?: number

	constructor(paginator: MatPaginator) {
		this.page = paginator.pageIndex
		this.size = paginator.pageSize
	}
}

export class PaginationResponse<T> {
	constructor(readonly total = 0, readonly items: T[] = []) {}
}
