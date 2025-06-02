import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Favorite, Share } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { clearErrors, getAllEvents } from "../redux/actions/event";

const propertyAndBlogPosts = [
  {
    id: 1,
    type: "property",
    user: "John Mwangi",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    content: "Spacious 3-bedroom apartment in Kilimani now available.",
    image:
      "https://t3.ftcdn.net/jpg/02/66/26/92/240_F_266269223_voOEkuIoS51yrL5G2Lw01OnqQQx9qBUb.jpg",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "blog",
    user: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "5 tips for first-time real estate buyers.",
    image:
      "https://t3.ftcdn.net/jpg/05/39/45/20/240_F_539452095_aTyAWRCYFRF44R2oaxLTPTJcFvl8CZMf.jpg",
    timestamp: "5 hours ago",
  },
];

const EventsPage = () => {
  const dispatch = useDispatch();
  const { allEvents, isLoading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
    return () => dispatch(clearErrors());
  }, [dispatch]);

  const eventPosts = allEvents.map((event) => ({
    id: event._id,
    type: "event",
    name: event.name,
    description: event.description,
    user: event.organizer || "Admin",
    avatar:
      event.avatar ||
      "https://randomuser.me/api/portraits/men/3.jpg",
    image:
      event.images && event.images.length > 0
        ? event.images[0].url
        : "",
    startDate: event.startDate,
    endDate: event.endDate,
    timestamp: new Date(event.createdAt).toLocaleString(),
  }));

  const allPosts = [...propertyAndBlogPosts, ...eventPosts];

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col md:flex-row gap-6">
        {["property", "blog", "event"].map((type) => (
          <div key={type} className="w-full md:w-1/3 space-y-6">
            <h2
              className={`text-2xl font-bold capitalize mb-4 ${
                type === "property"
                  ? "text-gray-800"
                  : type === "blog"
                  ? "text-blue-600"
                  : "text-green-600"
              }`}
            >
              {type === "property"
                ? "Properties"
                : type === "blog"
                ? "Latest Blogs"
                : "Upcoming Events"}
            </h2>

            {type === "event" && isLoading && (
              <p className="text-gray-500">Loading events...</p>
            )}

            {type === "event" && !isLoading && allEvents.length === 0 && (
              <p className="text-gray-500">No events available.</p>
            )}

            {allPosts
              .filter((post) => post.type === type)
              .map((post) => (
                <motion.div
                  key={`${post.type}-${post.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-4 rounded-lg shadow-lg border bg-white">
                    <div className="flex items-center gap-4">
                      <Avatar src={post.avatar} alt={post.user} />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {post.user}
                        </p>
                        <p className="text-gray-500 text-sm">{post.timestamp}</p>
                      </div>
                    </div>

                    <CardContent>
                      {post.type === "event" ? (
                        <>
                          <Typography variant="h6" className="text-gray-800 mb-1">
                            {post.name}
                          </Typography>
                          <Typography className="text-gray-600 mb-2">
                            {post.description}
                          </Typography>
                          <Typography className="text-sm text-gray-500 mb-2">
                            {new Date(post.startDate).toLocaleDateString()} —{" "}
                            {new Date(post.endDate).toLocaleDateString()}
                          </Typography>
                        </>
                      ) : (
                        <Typography className="text-gray-700 mb-2">
                          {post.content}
                        </Typography>
                      )}

                      {post.image && (
                        <CardMedia
                          component="img"
                          image={post.image}
                          className="rounded-lg mt-4"
                          alt={`${post.type} image`}
                        />
                      )}

                      <div className="flex justify-between mt-4">
                        {type === "blog" && (
                          <Button variant="contained" color="primary">
                            Read More
                          </Button>
                        )}
                        {type === "event" && (
                          <Button variant="contained" color="success">
                            Join Event
                          </Button>
                        )}
                        {type === "property" && (
                          <>
                            <IconButton>
                              <Favorite />
                            </IconButton>
                            <IconButton>
                              <Share />
                            </IconButton>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Divider className="my-4" />
                </motion.div>
              ))}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
