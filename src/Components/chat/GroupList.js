import React, { Component } from "react";
import { compose } from "redux";
import Group from "./Group";
import './GroupList.css'
export default class GroupList extends Component {
  // getOwner = (dic) => {
  //     console.log(dic, 'dic')
  //   console.log(
  //     Object.keys(dic).forEach((k) => {
  //       console.log(k, ":", dic[k]);
  //     })
  //   );
  // };
  render() {
    return (
      <div className="grouplist">
        <h2>Groups</h2>
        {this.props.groups.map((group, id) => {
          return (
            <button
              className="listitem"
              key={id}
              onClick={() => this.props.getGroup(group.id)}
            >
              <div>
                <h4 style={{ textAlign: "left" }}>{group.name}</h4>
              </div>

              {group.msgs ? (
                <p style={{textAlign : 'left'}} >
                  {group.msgs[parseInt(group.msgs.length) - 1]["owner"]}:
                  &nbsp;&nbsp;
                  {group.msgs[parseInt(group.msgs.length) - 1]["body"]}
                </p>
              ) : (
                <>No Messages Here...</>
              )}
            </button>
          );
        })}
      </div>
    );
  }
}
{
  /* <Group
  group={group}
  send_message={this.props.send_message}
  add_member={this.props.add_member}
/>; */
}
