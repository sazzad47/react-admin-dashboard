import React, { useContext } from "react";
import { Form, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  DispatchContext,
  StateContext,
} from "../../../../pages/Pages/GlobalViewPage/StateProvider";
import "./confirmBookmark.scss";

const ConfirmBookmark = () => {
  const { startBookMark, showError, bookmarking } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const saveBookMark = () => {
    if (!bookmarking?.name) {
      dispatch({
        type: "UPDATE_SHOWERROR",
        payload: {
          value: true,
        },
      });
      console.log("error >>", showError);
      return;
    }

    dispatch({
      type: "UPDATE_BOOKMARKED",
      payload: {
        name: bookmarking?.name,
        desc: bookmarking?.desc,
        long: bookmarking?.long,
        lat: bookmarking?.lat,
        alt: bookmarking?.alt,
        icon: bookmarking?.icon,
      },
    });

    cancelBookmark();
  };

  const cancelBookmark = () => {
    dispatch({
      type: "CLEAR_BOOKMARKING",
    });
    dispatch({
      type: "UPDATE_SHOWERROR",
      payload: {
        value: false,
      },
    });
    dispatch({
      type: "UPDATE_STARTBOOKMARK",
    });
  };

  const setBookMarking = (name, value) => {
    dispatch({
      type: "UPDATE_BOOKMARKING",
      payload: {
        method: name,
        value: value,
      },
    });
  };

 
  return (
    <Modal
      id="showModal"
      isOpen={startBookMark}
      toggle={cancelBookmark}
      centered
    >
      <ModalHeader className="bg-light p-3" toggle={cancelBookmark}>
        Save Bookmark
      </ModalHeader>
      <Form>
        <ModalBody>
          <input type="hidden" id="id-field" />
          <div className="mb-3">
            <Label htmlFor="id-field" className="form-label">
              Name
            </Label>
            <Input
              required
              className="form-control"
              type="text"
              value={bookmarking?.name}
              placeholder="Enter name"
              onChange={(e) => setBookMarking("name", e.target.value)}
              onFocus={() =>
                dispatch({
                  type: "UPDATE_SHOWERROR",
                  payload: {
                    value: false,
                  },
                })
              }
            />
            {showError && <p className="text-danger">Name is compulsory</p>}
          </div>
          <div className="mb-3">
            <Label htmlFor="id-field" className="form-label">
              Description
            </Label>
            <Input
              className="form-control"
              type="text"
              value={bookmarking?.desc}
              placeholder="Enter description"
              onChange={(e) => setBookMarking("desc", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="id-field" className="form-label">
              Latitude
            </Label>
            <Input
              className="form-control"
              value={bookmarking?.lat}
              placeholder="Enter latitude"
              onChange={(e) => setBookMarking("lat", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="id-field" className="form-label">
              Longitude
            </Label>
            <Input
              className="form-control"
              value={bookmarking?.long}
              placeholder="Enter longitude"
              onChange={(e) => setBookMarking("long", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="productname-field" className="form-label">
              Color
            </Label>

            <Input
              name="product"
              type="select"
              className="form-select"
              value={bookmarking?.icon}
              onChange={(e) => setBookMarking("icon", e.target.value)}
            >
              <option>Yellow</option>
              <option>Red</option>
              <option>Green</option>
            </Input>
          </div>
        </ModalBody>
      </Form>
      <div className="modal-footer">
        <div className="hstack gap-2 justify-content-end">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              cancelBookmark();
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              saveBookMark();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
    // <div className="confirm_bookmark" style={{ display: startBookMark ? 'block' : 'none' }}>
    //     <h4 className='bookmark_title'>Save Bookmark</h4>
    //     <div className='bookmark_desc'>
    //         <InputGroup className='input_group'>
    //             <InputGroupText>
    //                 Name:
    //             </InputGroupText>
    //             <Input
    //                 value={bookmarking?.name}
    //                 placeholder="Name"
    //                 onChange={(e) => setBookMarking("name", e.target.value)}
    //                 onFocus={() =>
    //                     dispatch({
    //                         type: "UPDATE_SHOWERROR",
    //                         payload: {
    //                             value: false
    //                         }
    //                     })}
    //             />
    //         </InputGroup>
    //         <InputGroup className='input_group'>
    //             <InputGroupText>
    //                 Desc:
    //             </InputGroupText>
    //             <Input
    //                 value={bookmarking?.desc}
    //                 placeholder="Description"
    //                 onChange={(e) => setBookMarking('desc', e.target.value)}
    //             />
    //         </InputGroup>
    //         <InputGroup className='input_group'>
    //             <InputGroupText>
    //                 Lat:
    //             </InputGroupText>
    //             <Input value={bookmarking?.lat} placeholder="Latitude" onChange={doNothing} />
    //         </InputGroup>
    //         <InputGroup className='input_group'>
    //             <InputGroupText>
    //                 Lon:
    //             </InputGroupText>
    //             <Input value={bookmarking?.long} placeholder="Longitude" onChange={doNothing} />
    //         </InputGroup>
    //         <InputGroup className='input_group'>
    //             <InputGroupText>
    //                 Color:
    //             </InputGroupText>
    //             <Input
    //                 name="select"
    //                 type="select"
    //                 value={bookmarking?.icon}
    //                 onChange={(e) => setBookMarking('icon', e.target.value)}
    //             >
    //                 <option>
    //                     Yellow
    //                 </option>
    //                 <option>
    //                     Red
    //                 </option>
    //                 <option>
    //                     Green
    //                 </option>
    //             </Input>
    //         </InputGroup>
    //     </div>
    //     <div className='bookmark_buttonsCont'>
    //         <Button color="danger" onClick={cancelBookmark}>
    //             Cancel
    //         </Button>
    //         <Button color="primary" onClick={() => saveBookMark()}>
    //             Save
    //         </Button>
    //     </div>
    //     {showError && <p className='error_text'>Name is compulsory</p>}
    // </div>
  );
};

export default ConfirmBookmark;
