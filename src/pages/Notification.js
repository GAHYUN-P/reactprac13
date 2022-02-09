import React from "react";
import {Grid, Text} from "../elements/Index.js";
import Card from "../components/Card";
import Button from "../elements/Button.js";
import { history } from "../redux/configureStore";

const Notification = (props) => {
    let noti = [
      { user_name: "hyunee", post_id: "post1" },
      { user_name: "hyunee", post_id: "post2" },
      { user_name: "hyunee", post_id: "post3" },
      { user_name: "hyunee", post_id: "post4" },
    ];

    return (
      <React.Fragment>
        <Grid padding="16px" bg="#EFF6FF">
          <Button text="x" width="5%" _onClick={() => {history.push('/')}}></Button>
          {noti.map((n) => {
            return <Card {...n} key={n.post_id} />;
          })}
        </Grid>
      </React.Fragment>
    );
}

export default Notification;