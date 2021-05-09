import React, { Component } from "react";
import axios from "axios";
import GroupList from "./GroupList";
import Group from "./Group";
export default class friendlist extends Component {
  state = {
    groups: [],
    friend_name: "",
    add_member: [],
    member_name: "",
    new_group: "",
    message: "",
    group_no: 0,
    group_active: false,
    active_group: {},
  };
  componentDidMount = () => {
    let token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("http://127.0.0.1:8000/groups/", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ groups: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
      axios
        .get("http://127.0.0.1:8000/getuser/", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data.username);
          this.setState({ user: res.data.username });
        })
        .catch((err) => {
          console.log(err);
        });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const { friend_name } = this.state;
    axios
      .post(
        "http://127.0.0.1:8000/get_create_relationship/",
        {
          to_person: friend_name,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          friends: [...this.state.friends, res.data],
        });
      });
  }
  add_member = (member_name, id) => (e) => {
    let token = localStorage.getItem("token");
    console.log(member_name);
    axios
      .post(
        `http://127.0.0.1:8000/groupsedit/`,
        {
          member_name: member_name,
          id: id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          groups: res.data,
          // active_group : ,
          member_name: "",
        });
      })
      .then(() => {
        this.changeGroup(id);
        console.log(id);
      });
  };
  send_message = (id, message) => (e) => {
    e.preventDefault();
    console.log("send_msg");
    let token = localStorage.getItem("token");
    // const { message } = this.state;
    axios
      .post(
        `http://127.0.0.1:8000/sendmessage/`,
        {
          message: message,
          id: id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          groups: res.data,
          message: "",
        });
      })
      .then(() => {
        this.changeGroup(id);
        console.log(id);
      });
  };
  create_group(e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const { new_group } = this.state;
    axios
      .post(
        "http://127.0.0.1:8000/groups/",
        {
          new_group: new_group,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          groups: [...this.state.groups, res.data],
        });
      });
  }
  getGroup = (id) => {
    const { group_no } = this.state;
    console.log(group_no, "sss");
    this.state.groups.filter((group) => {
      if (group.id === id) {
        console.log("iii", group.id);
        this.setState({
          active_group: group,
        });
        return true
      } else {
        console.log(group.id);
      }
    });
  };
  changeGroup = (id) => {
    this.setState({
      group_no: id,
      group_active: true,
    });
    console.log(id, "ddd");
    this.getGroup(id);
  };

  render() {
    return (
      <div>
        {/* <input
          type=""
          onChange={(e) => this.onChange(e)}
          name={"new_group"}
          value={this.state.new_group}
        />
        <button type="submit" onClick={(e) => this.create_group(e)}>
          Create Group
        </button> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <GroupList
            groups={this.state.groups}
            getGroup={this.changeGroup}
            // add_member={this.add_member}
            // send_message={this.send_message}
          />
          {console.log('userf',this.state.user)}
          {this.state.group_active ? (
            // <div style={{ height: "90vh", width: "80vw", overflow: "scroll" }}>
            // {console.log(this.state)}
            <Group
              group={this.state.active_group}
              key={this.state.active_group.id}
              group_id={this.state.active_group.id}
              username={this.state.user}
              send_message={this.send_message}
              message=""
              add_member={this.add_member}
            />
          ) : (
            // </div>
            <></>
          )}
        </div>
        {/* {this.state.groups.map((group, id) => {
          return (
            <div style={{ border: "1px red solid" }} key={id}>
              <h3>{group.name}</h3>
              <h5>Group Members</h5>
              {group.group_members.map((member, idi) => {
                return <div key={idi}>{member}</div>;
              })}
              <h1>Messages</h1>
              {group.msgs.map((msg, idi) => {
                return (
                  <div>
                    {" "}
                    {msg.body} {msg.date_time} {msg.owner}
                  </div>
                );
              })}
              <input
                type="text"
                placeholder="Enter a Message"
                value={this.state.message}
                name={"message"}
                onChange={(e) => this.onChange(e)}
              />
              <button type="submit" onClick={this.send_message(group.id)}>
                Send Message
              </button>
              <h1>Add Member</h1>
              <input
                type=""
                onChange={(e) => this.onChange(e)}
                name={"member_name"}
                value={this.state.member_name}
              />
              {console.log(this.state)}
              <button type="submit" onClick={this.add_member(group.id)}>
                Add Member
              </button>
            </div>
          );
        })} */}
      </div>
    );
  }
}
