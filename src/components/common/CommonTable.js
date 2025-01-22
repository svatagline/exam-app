import React from 'react'
import Button from './Button'
import { PaginatedItems } from './Pagination'

const CommonTable = ({
    row = [],
    data = [],
    loader = false,
    totalRecord = [],
    setCurrentItems = () => { },
    itemsPerPage = 10

}) => {
    return (
        <>
            <table id="common-table">
                <thead>
                    <tr>

                        {row.map((r, i) => {
                            return (
                                <th key={i} className={`${r?.className}`}>{r.title}</th>
                            )
                        })}

                    </tr>
                </thead>

                <tbody>
                    {
                        loader ?
                            <tr  >
                                <td colSpan={row?.length}>
                                    <div className='w-100 d-flex justify-content-center'>
                                        <div className='spinner-border text-primary' role='status'></div>
                                    </div>
                                </td>
                            </tr>
                            : <>
                                {(data &&
                                    data.length > 0) ?
                                    data.map((record, index) => (
                                        <tr key={index}>
                                            {row.map((R, i) => {
                                                return (
                                                    R['fieldName'] !== 'action' ?
                                                        <td key={i}  >{R['Wrapper'] ? <R.Wrapper record={record} />   : record[R['fieldName']]}</td> :
                                                        <td key={i} >

                                                            <div className='d-flex gap-3'>
                                                                {
                                                                    R['actionList'] && R['actionList'].map((act, index) => {
                                                                        return (
                                                                            <Button
                                                                                key={index}
                                                                                varient={act.varient}
                                                                                title={act.title}
                                                                                type='button'
                                                                                onClickFunction={() => act.handleClick(record)}
                                                                                loader={act.loader && act.loader == record._id}
                                                                                disabled={act.disabled && act.loader == record._id}
                                                                                class_name={act?.className}
                                                                            />
                                                                        )
                                                                    })
                                                                }

                                                            </div>
                                                        </td>
                                                )
                                            })}


                                           
                                        </tr>
                                    ))
                                    :
                                    <>

                                        <tr  >
                                            <td colSpan={row?.length}>
                                                <div className='w-100 d-flex justify-content-center'>
                                                    <img style={{ width: "40%" }} src="/assets/img/common/no-record-found.png" alt="no record found" />
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                }
                            </>
                    }
                </tbody>


            </table>
            {
                !loader && totalRecord.length !==0 &&
                 <PaginatedItems
                    items={totalRecord}
                    itemsPerPage={itemsPerPage}
                    setCurrentItems={setCurrentItems}
                />
            }


        </>
    )
}

export default CommonTable