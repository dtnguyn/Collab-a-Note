import React from "react";
import { MenuItem } from "@material-ui/core";

import { db } from "../../controller/api/firebase";

export default class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  componentDidMount() {
    db.collection(this.props.collection)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ values: data });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.values.map((i) => {
          return <MenuItem>{i.course_name}</MenuItem>;
        })}
      </React.Fragment>
    );
  }
}
