import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class ShowPlaces extends Component {
    render() {
        return (
          <div>
            <Modal
              show={true}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Places You Chose To Visit
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                <p>
                  {this.props.places.map((place, i) => {
                    return (
                      <div>
                        {place.name} {"  "}
                      </div>
                    );
                  })}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
    }
}
