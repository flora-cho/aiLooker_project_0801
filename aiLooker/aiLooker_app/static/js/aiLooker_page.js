'use strict';
const e = React.createElement;

function App() {
  const [list             , setList            ] = React.useState([]);
  const [count            , setCount           ] = React.useState(0);
  const [pages            , setPages           ] = React.useState([]);
  const [page             , setPage            ] = React.useState(0);
  const [showModal        , setShowModal       ] = React.useState(false);
  const [modalDescription , setModalDescription] = React.useState("");
  const [itemId           , setItemId          ] = React.useState(null);
  const [error            , setError           ] = React.useState("");
  const [advtno           , setAdvtno          ] = React.useState("");
  const [advttpcd         , setAdvttpcd        ] = React.useState("");
  const [advttitl         , setAdvttitl        ] = React.useState("");
  const [advtstadate      , setAdvtstadate     ] = React.useState("");
  const [advtenddate      , setAdvtenddate     ] = React.useState("");
  const [advtdesc         , setAdvtdesc        ] = React.useState("");
  const [advtgrdcd        , setAdvtgrdcd       ] = React.useState("");
  const [delyn            , setdelyn           ] = React.useState("");
  const [fstaddtmst       , setfstaddtmst      ] = React.useState("");
  const [fstaddid         , setfstaddid        ] = React.useState("");
  const [lastupttmst      , setlastupttmst     ] = React.useState("");
  const [lastuptid        , setlastuptid       ] = React.useState("");

  const success = (data) => {
    setList(data.data);
    setCount(data.count);

    const newPages = [];

    if (data.count > 5) {
      for (let i=0; i<Math.ceil(data.count / 5); i++) {
        newPages.push({
          name: (i+1).toString(),
          page: i,
        });
        console.log("page",i);
      }

      if (page > newPages.length-1) {
        setPage(page-1);
      }
      
    } else {
      setPage(0);
    }
    setPages(newPages);
  };

  const logout = async (e)=>{
    await localStorage.setItem("aiLookerToken",null);
    window.location = "/login";
  };

  const getData = ()=>{
    get_aiLookers_api(page, success, (text)=>{console.log("Error: ", text)});
  };

  const newTbladvtbsc = ()=>{
    setModalDescription("광고 신규등록");
    setAdvtno(0);
    setAdvttpcd("");
    setAdvttitl("");
    setAdvtstadate("");
    setAdvtenddate("");
    setAdvtdesc("");
    setAdvtgrdcd("");
    setdelyn("");
    setfstaddtmst("");
    setfstaddid("");
    setlastupttmst("");
    setlastuptid("");
    setError("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };

  const editTbladvtbsc = (data)=>{
    setModalDescription("광고 신규등록");
    setAdvtno(data.advtno);
    setAdvttpcd(data.advttpcd);
    setAdvttitl(data.advttitl);
    setAdvtstadate(data.advtstadate);
    setAdvtenddate(data.advtenddate);
    setAdvtdesc(data.advtdesc);
    setAdvtgrdcd(data.advtgrdcd);
    setdelyn(data.delyn);
    setfstaddtmst(data.fstaddtmst);
    setfstaddid(data.fstaddid);
    setlastupttmst(data.lastupttmst);
    setlastuptid(data.lastuptid);
    setError("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };

  const saveTbladvtbsc = (e)=>{
    e.preventDefault();
    setError("");
    console.log("saving new", advtno, advttpcd, advttitl, advtstadate, advtenddate, advtdesc, advtgrdcd);
    if (advtno.length === 0)
      setError("Please enter advtno");
    else {
      if (advtno === null)
        post_aiLooker_api({advttpcd, advttitl, advtstadate, advtenddate, advtdesc, advtgrdcd}, ()=>{getData();});
      else
        put_aiLooker_api(advtno, {advttpcd, advttitl, advtstadate, advtenddate, advtdesc, advtgrdcd}, ()=>{getData();});
      setShowModal(false);
    }
  };

  const deleteTbladvtbsc = (advtno)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        delete_aiLooker_api(advtno, ()=>{
          Swal.fire({
              title: 'Deleted!',
              text: "Your advtno has been deleted!",
              icon: 'success',
              timer: 1000,
          });
          getData();
        });
      }
    });
  };

  const keyDownHandler = (e)=>{
    if (e.which === 27)
      setShowModal(false);
  };

  React.useEffect(()=>{
    getData();
  }, [page]);

  return (
    <div onKeyDown={keyDownHandler}>
      <div style={{background: "#00000060"}}
          className={"modal " + (showModal?" show d-block":" d-none")} tabIndex="-1" role="dialog">
        <div className="modal-dialog shadow">
          <form method="post">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalDescription}</h5>
              <button type="button" className="btn-close" onClick={()=>{setShowModal(false)}} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label>광고번호</label>
                <div className="form-group">
                  <input type="text" className="form-control" name="advtno" id="itemInput"
                         value={advtno} onChange={(e)=>{setAdvtno(e.target.value)}}
                         placeholder="광고번호"/>
                </div>
              <label style={{marginTop: "1em"}}>광고종류</label>
                <div className="form-group" >
                  <input type="text" className="form-control" placeholder="광고종류"
                         value={advttpcd} onChange={(e)=>{setAdvttpcd(e.target.value)}}
                         name="advttpcd" />
                </div>
              <label style={{marginTop: "1em"}}>광고제목</label>
                <div className="form-group">
                  <input type="text" className="form-control"
                         value={advttitl} onChange={(e)=>{setAdvttitl(e.target.value)}}
                         placeholder="광고제목" name="advttitl" />
                </div>
                <label style={{marginTop: "1em"}}>광고시작일자</label>
                <div className="form-group">
                  <input type="text" className="form-control"
                         value={advtstadate} onChange={(e)=>{setAdvtstadate(e.target.value)}}
                         placeholder="광고시작일자" name="advtstadate" />
                </div>
                <label style={{marginTop: "1em"}}>광고종료일자</label>
                <div className="form-group">
                  <input type="text" className="form-control"
                         value={advtenddate} onChange={(e)=>{setAdvtenddate(e.target.value)}}
                         placeholder="광고종료일자" name="advtenddate" />
                </div>
                <label style={{marginTop: "1em"}}>광고내용</label>
                <div className="form-group">
                  <input type="text" className="form-control"
                         value={advtdesc} onChange={(e)=>{setAdvtdesc(e.target.value)}}
                         placeholder="광고내용" name="advtdesc" />
                </div>
                <label style={{marginTop: "1em"}}>광고등급</label>
                <div className="form-group">
                  <input type="text" className="form-control"
                         value={advtgrdcd} onChange={(e)=>{setAdvtgrdcd(e.target.value)}}
                         placeholder="광고등급" name="advtgrdcd" />
                </div>

              <small className="form-text text-muted">{error}</small>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={()=>{setShowModal(false)}} data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={saveTbladvtbsc}>Save changes</button>
            </div>
          </div>
          </form>
        </div>
      </div>

      <div style={{maxWidth: "800px", margin: "auto", marginTop: "1em", marginBottom: "1em",
                    padding: "1em"}} className="shadow">
        <div style={{display: "flex", flexDirection: "row"}}>
          <span>[0010-광고관리]</span>
          <a className="btn btn-light" style={{marginLeft: "auto"}} onClick={logout}>Logout</a>
        </div>
      </div>
      <div style={{maxWidth: "800px", margin: "auto", marginTop: "1em", marginBottom: "1em",
                    padding: "1em"}} className="shadow">
        <div style={{display: "flex", flexDirection: "row", marginBottom: "5px"}}>
          {pages.length > 0 && <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
            <ul className="pagination">
              <li className={"page-item " + (page === 0?"disabled":"")} onClick={(e)=>{
                    e.preventDefault();
                    setPage(Math.max(page-1,0));
              }}><a className="page-link" href="#" aria-label="Previous"><span
                  aria-hidden="true">«</span></a></li>
              {pages.map((el)=><li key={"page" + el.page} onClick={(e)=>{
                  setPage(el.page);
                }} className={"page-item "+(page===el.page?"active":"")}>
                <a className="page-link" href="#">
                  {el.name}
                </a></li>)}
              <li className={"page-item " + (page === pages.length-1?"disabled":"")} onClick={(e)=>{
                    setPage(Math.min(page+1,pages.length-1));
              }}><a className="page-link" href="#" aria-label="Next"><span
                  aria-hidden="true">»</span></a></li>
            </ul>
          </nav>}
          <a className="btn btn-light" style={{marginLeft: "auto"}}
             onClick={newTbladvtbsc}
          >신규광고등록</a>
        </div>
        <table className="table table-hover caption-top">
          <thead className="table-light">
          <tr>
            <th>광고번호</th>
            <th>광고종류</th>
            <th>광고제목</th>
            <th>광고시작일자</th>
            <th>광고종료일자</th>
            <th>광고내용</th>
            <th>광고등급</th>
          </tr>
          </thead>
          <tbody>
          { list.map((row)=>
            <tr key={row.advtno}>
              <td>{row.advtno}</td>
              <td>{row.advttpcd}</td>
              <td>{row.advttitl}</td>
              <td>{row.advtstadate}</td>
              <td>{row.advtenddate}</td>
              <td>{row.advtdesc}</td>
              <td>
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={(e)=>{editTbladvtbsc(row)}}>Edit</a>{" "}
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={(e)=>{deleteTbladvtbsc(row.advtno)}}>Delete</a>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(
  e(App),
  domContainer
);
