import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Loader/Loader";
import { getAllEvents } from "../redux/actions/event";
import Footer from "../components/Layout/Footer";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { allEvents, isLoading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents?.length > 0 ? (
            allEvents.map((event, index) => (
              <EventCard
                key={event._id || index}
                active={index === 0}
                data={event}
              />
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default EventsPage;
