import React, { Component } from "react";
import { IconContext } from "react-icons/lib";
import "./Upload.css";

export class Upload extends Component {
  state = {
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  };
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  render() {
    const { profileImg } = this.state;
    return (
      <IconContext.Provider value={{ color: "#fff", size: 64 }}>
        <div>

          <div className="Upload__section">
            <div className="Upload__wrapper">
              <h1 className="Upload__heading">Upload your file</h1>
              <br></br>
              <div className="img-holder">
                <img src={profileImg} alt="" id="img" className="img" />
              </div>
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
                onChange={this.imageHandler}
              />
              <div className="label">
                <label className="image-upload" htmlFor="input">
                  Choose File
                </label>
              </div>
              <br></br>
              </div>
            </div>
          </div>
      </IconContext.Provider>
    );
  }
}
export default Upload;