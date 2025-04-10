import React, { useState, useEffect } from 'react';
import { FiX, FiNavigation, FiExternalLink } from 'react-icons/fi';
import './HospitalLocator.css';

const HospitalLocator = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  
  // Mock data for nearby hospitals (in a real app, this would come from Google Maps API)
  const mockHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      distance: "1.2 km",
      rating: 4.5,
      open: true,
      phone: "+1 (555) 123-4567",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: "Memorial Medical Center",
      address: "456 Park Avenue, Midtown",
      distance: "2.5 km",
      rating: 4.2,
      open: true,
      phone: "+1 (555) 987-6543",
      coordinates: { lat: 40.7308, lng: -73.9973 }
    },
    {
      id: 3,
      name: "University Hospital",
      address: "789 College Road, Uptown",
      distance: "3.8 km",
      rating: 4.7,
      open: true,
      phone: "+1 (555) 456-7890",
      coordinates: { lat: 40.7294, lng: -73.9874 }
    },
    {
      id: 4,
      name: "Community Health Center",
      address: "321 Neighborhood Lane, Westside",
      distance: "4.1 km",
      rating: 3.9,
      open: false,
      phone: "+1 (555) 234-5678",
      coordinates: { lat: 40.7053, lng: -74.0142 }
    },
    {
      id: 5,
      name: "Riverside Medical Facility",
      address: "555 Waterfront Drive, Eastside",
      distance: "5.3 km",
      rating: 4.1,
      open: true,
      phone: "+1 (555) 876-5432",
      coordinates: { lat: 40.7223, lng: -73.9874 }
    }
  ];
  
  useEffect(() => {
    if (!isOpen) return;
    
    // Simulate getting user location
    setLoading(true);
    
    // In a real app, we would use the browser's geolocation API
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            
            // In a real app, we would call the Google Maps API here
            // For now, we'll use mock data
            setTimeout(() => {
              setNearbyHospitals(mockHospitals);
              setLoading(false);
            }, 1500); // Simulate API delay
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Unable to access your location. Please enable location services.");
            setLoading(false);
            
            // Still show mock data for demo purposes
            setTimeout(() => {
              setNearbyHospitals(mockHospitals);
              setLoading(false);
            }, 1500);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        setLoading(false);
        
        // Still show mock data for demo purposes
        setTimeout(() => {
          setNearbyHospitals(mockHospitals);
          setLoading(false);
        }, 1500);
      }
    };
    
    getUserLocation();
    
    return () => {
      // Cleanup if needed
    };
  }, [isOpen]);
  
  const openGoogleMaps = (hospital) => {
    // In a real app, this would open Google Maps with directions to the hospital
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name)}`;
    window.open(url, '_blank');
  };
  
  const callHospital = (phone) => {
    // In a real app, this would initiate a phone call
    window.location.href = `tel:${phone}`;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="hospital-locator-overlay" onClick={onClose}>
      <div className="hospital-locator-content" onClick={e => e.stopPropagation()}>
        <div className="hospital-locator-header">
          <h3>Nearby Hospitals</h3>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close hospital locator"
          >
            <FiX />
          </button>
        </div>
        
        <div className="hospital-locator-body">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Finding hospitals near you...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="map-container">
                {/* In a real app, this would be a Google Map component */}
                <div className="mock-map">
                  <div className="map-placeholder">
                    <FiNavigation className="location-icon" />
                    <p>Map showing {nearbyHospitals.length} hospitals near you</p>
                    <small>This is a placeholder for Google Maps integration</small>
                  </div>
                </div>
              </div>
              
              <div className="hospitals-list">
                <h4>Hospitals Near You</h4>
                {nearbyHospitals.map(hospital => (
                  <div key={hospital.id} className="hospital-card">
                    <div className="hospital-info">
                      <h5>{hospital.name}</h5>
                      <p className="hospital-address">{hospital.address}</p>
                      <div className="hospital-details">
                        <span className="hospital-distance">
                          <FiNavigation /> {hospital.distance}
                        </span>
                        <span className={`hospital-status ${hospital.open ? 'open' : 'closed'}`}>
                          {hospital.open ? 'Open Now' : 'Closed'}
                        </span>
                        <span className="hospital-rating">
                          ★ {hospital.rating}
                        </span>
                      </div>
                    </div>
                    <div className="hospital-actions">
                      <button 
                        className="directions-button"
                        onClick={() => openGoogleMaps(hospital)}
                        aria-label={`Get directions to ${hospital.name}`}
                      >
                        <FiExternalLink />
                        <span>Directions</span>
                      </button>
                      <button 
                        className="call-button"
                        onClick={() => callHospital(hospital.phone)}
                        aria-label={`Call ${hospital.name}`}
                      >
                        Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalLocator; 