import "./App.css";
import { useLocation, Link } from "react-router-dom";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "35vh"
};

const ContactsInfo = () => {
  const location = useLocation();
  const userInfo = { ...location.state };
  const defaultProps = {
    center: {
      lat: parseInt(userInfo.address.geo.lat),
      lng: parseInt(userInfo.address.geo.lng)
    },
    zoom: 9
  };
  // For directing to Mail application
  let mailtoHref = `mailto:${userInfo.email}?subject=SendMail&body=Description`;
  // Google API and libraries section for implementing
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY",
    libraries
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>User Information</h1>
      <div>
        <div className="small-title">
          <h2>{userInfo.name}</h2>
          <p>
            Username: <span>{userInfo.username}</span>
          </p>
          <p>Phone: {userInfo.phone}</p>
          <p>
            Email: <a href={mailtoHref}>{userInfo.email}</a>
          </p>
          <p>
            Website:
            <a href={`//${userInfo.website}`} target="_blank">
              {userInfo.website}
            </a>
          </p>
        </div>
        <div className="small-title">
          <h3>Company</h3>
          <p>Company Name: {userInfo.company.name}</p>
          <p>BS: {userInfo.company.bs}</p>
          <p>Catch Phrase: {userInfo.company.catchPhrase}</p>
        </div>
        <div className="small-title">
          <h3>Address</h3>
          <p>Street: {userInfo.address.street}</p>
          <p>Suite: {userInfo.address.suite}</p>
          <p>City: {userInfo.address.city}</p>
          <p>Zip Code: {userInfo.address.zipcode}</p>
          <div className="maps">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={defaultProps.center}
              ></GoogleMap>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsInfo;
