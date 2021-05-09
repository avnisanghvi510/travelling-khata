import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import axios from "axios";
import "./Places.css";
import Button from "react-bootstrap/Button";
import ShowPlaces from "./ShowPlaces";

export default class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = { places: [], showPlaces: false, address: "", placeName: "" };
  }
  componentDidMount = () => {
    let token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("http://127.0.0.1:8000/places/", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => this.setState({ places: res.data }))
      .catch((err) => {
        console.log(err);
      });

    //       axios.get( 'https://api.foursquare.com/v2/venues/explore', {
    //         client_id : "UIN3BUN10HWIK502ZDDDFGAMQPP0AFAJCOXWYV2H3JSN3ANJ",
    //         client_secret:"VNGHFVYGUTGXDQI4Y1I5FPI5MLBIPAAU5L4VIXNS2YSU1MF3",
    //         v: "20180323",
    //         ll: "40.7243,-74.0018",
    //         query: "places",
    //         limit: 1,
    //       }
    //       .then((res)=>{console.log(res)})
    //       .catch((err)=>{console.log(err)})
    // )
  };
  handleChange = (address) => {
    this.setState({ address });
  };

  handlePlaceChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.placeName);
    let token = localStorage.getItem("token");
    let place = this.state.placeName;
    axios
      .post(
        "http://127.0.0.1:8000/places/",
        {
          name: place,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) =>
        this.setState({
          places: [...this.state.places, res.data, (this.state.placeName = "")],
        })
      );
  };

  render() {
    return (
      <div className="canvas">
        {console.log(this.state.places)}
        {/* {this.state.places.map((place, i) => (
          <div key={i}>
            <p>{place.name}</p>
          </div>
        ))} */}

        <form onSubmit={this.handleSubmit}>
          <input
            className="location-search"
            placeholder="Enter a place"
            name="placeName"
            type="text"
            value={this.state.placeName}
            onChange={this.handlePlaceChange}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
        {this.state.showPlaces ? (
          <ShowPlaces
            places={this.state.places}
            onHide={() => this.setState({ showPlaces: false })}
          />
        ) : (
          <button
            className="place-btn"
            onClick={() => {
              this.setState({ showPlaces: true });
            }}
          >
            Show Places
          </button>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />

              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete> */}
      </div>
    );
  }
}
