import React, { Component } from "react";
import "./App.css";
import "./animatednavbar.css";
import { Motion, spring } from "react-motion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(e) {
    e.preventDefault();
    this.setState({
      clicked: !this.state.clicked
    });
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ width: 350 }}>
          <div className="bg" />
          <input
            type="Button"
            defaultValue="..."
            style={{ float: "right" }}
            onClick={e => this.clickHandler(e)}
          />
          <Buttons
            sx={-10}
            fx={-10}
            sy={-250}
            fy={100}
            so={0}
            fo={1}
            stf={200}
            sbo={0}
            fbo={0.2}
            enable={this.state.clicked}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default App;

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blackScreen: true
    };
  }

  render() {
    const values = {
      startPositionX: this.props.sx ? this.props.sx : 0,
      finishPositionX: this.props.fx ? this.props.fx : 0,
      startPositionY: this.props.sy ? this.props.sy : -250,
      finishPositionY: this.props.fy ? this.props.fy : 120,
      startOpacity: this.props.so ? this.props.so : 0,
      finishOpacity: this.props.fo ? this.props.fo : 1,
      stiffness: this.props.stf ? this.props.stf : 200,
      damping: this.props.dmp ? this.props.dmp : 50,
      startBackgroundOpacity: this.props.sbo ? this.props.sbo : 0,
      finishBackgroundOpacity: this.props.fbo ? this.props.fbo : 0.2,
      blackBackgroundHeight: this.props.bbh ? this.props.bbh : 500,
      blackBackgroundWidth: this.props.bbw ? this.props.bbw : 300
    };
    const forwardStyleConfig = {
      stiffness: values.stiffness,
      damping: values.damping
    };
    const backwardStyleConfig = {
      stiffness: values.stiffness,
      damping: values.damping
    };

    const defaultStyle = {
      x: this.props.enable ? values.finishPositionX : values.startPositionX,
      y: this.props.enable ? values.finishPositionY : values.startPositionY,
      opacity: this.props.enable ? values.finishOpacity : values.startOpacity,
      backgroundOpacity: this.props.enable
        ? values.finishBackgroundOpacity
        : values.startBackgroundOpacity
    };
    const style = {
      x: this.props.enable
        ? spring(values.finishPositionX, forwardStyleConfig)
        : spring(values.startPositionX, backwardStyleConfig),
      y: this.props.enable
        ? spring(values.finishPositionY, forwardStyleConfig)
        : spring(values.startPositionY, backwardStyleConfig),
      opacity: this.props.enable
        ? spring(values.finishOpacity)
        : spring(values.startOpacity),
      backgroundOpacity: this.props.enable
        ? spring(values.finishBackgroundOpacity)
        : spring(values.startBackgroundOpacity)
    };

    if (
      values.finishBackgroundOpacity === style.backgroundOpacity &&
      !this.props.enable
    ) {
      this.setState({
        blackScreen: false
      });
    }
    return (
      <Motion
        defaultStyle={{
          x: defaultStyle.x,
          y: defaultStyle.y,
          opacity: defaultStyle.opacity,
          backgroundOpacity: defaultStyle.backgroundOpacity
        }}
        style={{
          x: style.x,
          y: style.y,
          opacity: style.opacity,
          backgroundOpacity: style.backgroundOpacity
        }}
      >
        {style => (
          <React.Fragment>
            {this.state.blackScreen ? (
              <div
                className="black-effect"
                style={{
                  opacity: style.backgroundOpacity,
                  width: `${values.blackBackgroundWidth}px`,
                  height: `${values.blackBackgroundHeight}px`
                }}
              />
            ) : (
              ""
            )}
            <div
              style={{
                WebkitTransform: `translate(${style.x}px, ${style.y}px)`,
                msTransform: `translate(${style.x}px, ${style.y}px)`
              }}
            >
              <div className="wrapper">
                <div className="box" style={{ opacity: style.opacity }}>
                  1
                </div>
                <div className="box" style={{ opacity: style.opacity }}>
                  2
                </div>
                <div className="box" style={{ opacity: style.opacity }}>
                  3
                </div>
                <div className="box" style={{ opacity: style.opacity }}>
                  4
                </div>
                <div className="box" style={{ opacity: style.opacity }}>
                  5
                </div>
                <div className="box" style={{ opacity: style.opacity }}>
                  6
                </div>
                <div className="box" style={{ opacity: style.opacity }}>
                  7
                </div>
                <div className="box" style={{ opacity: style.opacity }}>
                  8
                </div>
                <div className="box" style={{ opacity: style.opacity }}>
                  9
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </Motion>
    );
  }
}
