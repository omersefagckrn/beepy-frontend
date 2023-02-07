import React from 'react';
import ReactPaginate from 'react-paginate';
import { PaginateProps, PaginateStates } from '../../@types/components/Paginate/Paginate';

class Paginate extends React.Component<PaginateProps, PaginateStates> {
	render() {
		return (
			<>
				<div className='flex cursor-pointer select-none items-center justify-center '>
					<ReactPaginate
						containerClassName='flex xxs:w-full xxs:max-w-auto items-center justify-center inline-flex'
						nextLinkClassName='items-center px-4 flex justify-center border border-gray-200 text-sm hover:text-white hover:bg-primary h-10 rounded-r-lg'
						previousLinkClassName='items-center px-4 flex justify-center border border-gray-200 text-sm hover:text-white hover:bg-primary h-10 rounded-l-lg'
						pageClassName='border-gray-200 hover:bg-primary items-center flex justify-center border text-lg hover:text-white w-10 h-10'
						breakLabel='...'
						breakClassName='border-primary items-center flex justify-center border text-lg hover:text-white w-10 h-10'
						nextLabel='Next'
						previousLabel='Previous'
						onPageChange={(e) => this.props.onPageChange(e.selected + 1)}
						pageCount={this.props.pageCount}
						initialPage={0}
						activeClassName='text-white bg-primary'
					/>
				</div>
			</>
		);
	}
}
export default Paginate;
