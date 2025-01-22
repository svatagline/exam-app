import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";





export function PaginatedItems({ items, itemsPerPage, setCurrentItems, loader = false }) {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    console.log(event.selected)
    setCurrentPage(event.selected)
    const newOffset = event.selected * itemsPerPage % items.length;
    setItemOffset(newOffset);
  };


  const handlePageChange = (page) => {
    console.log(page,pageCount)
    setCurrentPage(page)
    const newOffset = page * itemsPerPage % items.length;
    setItemOffset(newOffset); 
  }
  return (
    <>
      <br />
      {
        !loader && items.length !== 0 &&
        <>
          {/* <ReactPaginate
            nextLabel={<><i className={`fa fa-arrow-right`}></i></>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={<><i className={`fa fa-arrow-left`}></i></>}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          /> */}

          <nav aria-label="Page navigation example"  >
            <ul className="pagination">
              <li className={`page-item ${currentPage == 0?"disable-item":""}`} disabled={currentPage == 0} onClick={() =>{currentPage !== 0 && handlePageChange(currentPage-1)}}>
                <a className="page-link" href="#">
                <i className={`fa fa-arrow-left`}></i>
                </a>
              </li>

              <li className={`page-item ${currentPage == 0 ? "active" : ""}`} onClick={() => handlePageChange(0)}>
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              {
                pageCount > 1 &&
                <li className={`page-item ${currentPage == 1 ? "active" : ""}`} onClick={() => handlePageChange(1)}>
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
              }

              {((( currentPage >= 1 && currentPage < 5)   || pageCount < 10 ) && pageCount > 2) &&
                <li className={`page-item ${currentPage == 2 ? "active" : ""}`} onClick={() => handlePageChange(2)}>
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
              } 
              {(((currentPage > 1 && currentPage < 5) || pageCount < 10 ) && pageCount > 3)&&
                <li className={`page-item ${currentPage == 3 ? "active" : ""}`} onClick={() => handlePageChange(3)}>
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
              }
              {(((currentPage > 2 && currentPage < 5 ) || pageCount < 10) && pageCount > 4) &&
                <li className={`page-item ${currentPage == 4 ? "active" : ""}`} onClick={() => handlePageChange(4)}>
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
              }
              {(((currentPage > 3 && currentPage < 5) || pageCount < 10 ) && pageCount > 5) && 
                <li className={`page-item ${currentPage == 5 ? "active" : ""}`} onClick={() => handlePageChange(5)}>
                  <a className="page-link" href="#">
                    6
                  </a>
                </li>
              }
              {(((currentPage > 4 && currentPage < 5) || pageCount < 10 ) && pageCount>6  ) && 
                <li className={`page-item ${currentPage == 6 ? "active" : ""}`} onClick={() => handlePageChange(6)}>
                  <a className="page-link" href="#">
                    7
                  </a>
                </li>
              }
              {(((currentPage > 5 && currentPage < 5) || pageCount < 10   ) && pageCount>7) && 
                <li className={`page-item ${currentPage == 7 ? "active" : ""}`} onClick={() => handlePageChange(7)}>
                  <a className="page-link" href="#">
                    8
                  </a>
                </li>
              }
              {(((currentPage > 6 && currentPage < 5) || pageCount < 10   ) && pageCount>8) && 
                <li className={`page-item ${currentPage == 8 ? "active" : ""}`} onClick={() => handlePageChange(8)}>
                  <a className="page-link" href="#">
                    9
                  </a>
                </li>
              } 

              {(currentPage >= 5 &&   pageCount > 9 ) &&
                <li className="page-item"   >
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
              }
              {currentPage >= 5 && currentPage < pageCount - 4 && 
                <li className="page-item" onClick={() => handlePageChange(currentPage - 1)}>
                  <a className="page-link" href="#">
                    {currentPage}
                  </a>
                </li>
              }
              {currentPage >= 5 && currentPage < pageCount - 4 &&
                <li className="page-item active" onClick={() => handlePageChange(currentPage)}>
                  <a className="page-link " href="#">
                    {currentPage + 1}
                  </a>
                </li>
              }
              {currentPage >= 5 && currentPage < pageCount - 4 &&
                <li className="page-item" onClick={() => handlePageChange(currentPage + 1)}>
                  <a className="page-link" href="#">
                    {currentPage + 2}
                  </a>
                </li>
              }
              {pageCount > 5 && currentPage < pageCount - 4  && pageCount >9 && 
                <li className="page-item"   >
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
              }



              {
                pageCount > 9   &&
                <>
                  {/* ------------------- */}
                  {currentPage > pageCount - 5 && pageCount >7 &&
                    <li className={`page-item ${currentPage == pageCount - 5 ? "active" : ""}`} onClick={() => handlePageChange(pageCount - 5)}>
                      <a className="page-link" href="#">
                        {pageCount - 4}
                      </a>
                    </li>
                  }
                  {currentPage > pageCount - 5 && pageCount >7 &&
                    <li className={`page-item ${currentPage == pageCount - 4 ? "active" : ""}`} onClick={() => handlePageChange(pageCount - 4)}>
                      <a className="page-link" href="#">
                        {pageCount - 3}
                      </a>
                    </li>
                  }
                  {currentPage > pageCount - 5 && pageCount >7 &&
                    <li className={`page-item ${currentPage == pageCount - 3 ? "active" : ""}`} onClick={() => handlePageChange(pageCount - 3)}>
                      <a className="page-link" href="#">
                        {pageCount - 2}
                      </a>
                    </li>
                  }
                   
                  {/* ------------------- */}
                  <li className={`page-item ${currentPage == pageCount - 1 ? "active" : ""}`} onClick={() => handlePageChange(pageCount - 1)}>
                    <a className="page-link" href="#">
                      {pageCount - 1}
                    </a>
                  </li>
                  <li className={`page-item ${currentPage == pageCount ? "active" : ""}`} onClick={() => handlePageChange(pageCount)}>
                    <a className="page-link" href="#">
                      {pageCount}
                    </a>
                  </li>
                </>
              } 
              <li className={`page-item ${!(currentPage !== (currentPage > 9 ?pageCount :pageCount-1))?"disable-item":""}`} disabled={!(currentPage !== (currentPage > 9 ?pageCount :pageCount-1))} onClick={() =>{currentPage !== (currentPage > 9 ?pageCount :pageCount-1)   && handlePageChange(currentPage+1)}}>
                <a className="page-link" href="#">
                <i className={`fa fa-arrow-right`}></i>
                </a>
              </li>
            </ul>
          </nav>

        </>

      }

    </>
  );
}
