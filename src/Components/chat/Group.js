import React, { Component } from "react";
import "./Group.css";
import ScrollableFeed from "react-scrollable-feed";

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.setState({
      addMember: false,
      member_name: "",
      message: this.props.message,
    });
  }
  state = {
    addMember: false,
    member_name: "",
    message: this.props.message,
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { group } = this.props;
    return (
      <div className="group">
        {console.log("userf", this.props.username)}
        <div className="group_info">
          <h3 style={{ color: "red" }}>{group.name}</h3>
          <p>
            {group.group_members.map((member, idi) => {
              return <span key={idi}>{member}&nbsp;</span>;
            })}
          </p>
        </div>
        <ScrollableFeed forceScroll={true}>
          <div className="group_msgs" ref={"messageList"}>
            {group.msgs.map((msg, idi) => {
              return (
                <div
                  key={idi}
                  className="msg"
                  style= {this.props.username === msg.owner ? {marginLeft : 'auto', marginRight : '3rem'} : {} }
                >
                  <div className="msg_owner">{msg.owner}</div>{" "}
                  <div className="msg_body">
                    <div className="msg_">{msg.body}</div>
                    <div className="msg_time">
                      {msg.date_time.split("T")[1].slice(0, 5)}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* {this.scrollToBottom} */}
          </div>
        </ScrollableFeed>
        <div className="new_msg">
          <input
            type="text"
            placeholder="Enter a Message"
            value={this.state.message}
            name={"message"}
            onChange={(e) => this.onChange(e)}
          />
          <button
            type="submit"
            onClick={this.props.send_message(group.id, this.state.message)}
          >
            Send Message
          </button>
        </div>
        {/* {this.state.addMember ? (
          <>
            <h1>Add Member</h1>
            <input
              type=""
              onChange={(e) => this.onChange(e)}
              name={"member_name"}
              value={this.state.member_name}
            />
            <button
              type="submit"
              onClick={this.props.add_member(this.state.member_name, group.id)}
            >
              Add Member
            </button>
          </>
        ) : (
          <>
            {" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                this.setState({ addMember: true });
              }}
            >
              {" "}
              Add Member
            </button>{" "}
          </>
        )} */}
      </div>
    );
  }
}
