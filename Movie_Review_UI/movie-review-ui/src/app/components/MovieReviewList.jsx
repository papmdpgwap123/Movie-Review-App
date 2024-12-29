import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";

const MovieReviewList = ({
  groupedReviews,
  expandedMovie,
  handleMovieExpand,
  editId,
  editComments,
  setEditComments,
  handleSaveEdit,
  handleEditReview,
  handleDeleteReview,
  loading,
}) => {
  return (
    <Box flex={8}>
      {Object.entries(groupedReviews).map(([movieName, movieReviews]) => (
        <Accordion
          key={movieName}
          sx={{
            marginBottom: "1rem",
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.17)",
          }}
          expanded={expandedMovie === movieName}
          onChange={() => handleMovieExpand(movieName)}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(26, 35, 126, 0.04)",
              },
            }}
          >
            <Typography variant="h6">
              {movieName} ({movieReviews.length}{" "}
              {movieReviews.length === 1 ? "review" : "reviews"})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {(() => {
              const shouldScroll = movieReviews.length > 2;
              return (
                <Box
                  sx={{
                    maxHeight: shouldScroll ? "400px" : "none",
                    overflowY: shouldScroll ? "scroll" : "visible",
                    paddingRight: shouldScroll ? "16px" : 0,
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#888",
                      borderRadius: "4px",
                      "&:hover": {
                        background: "#555",
                      },
                    },
                  }}
                >
                  <Grid container>
                    {movieReviews.map((review) => (
                      <Grid item xs={12} key={review.id}>
                        <Card
                          sx={{
                            marginBottom: "1rem",
                            background: "rgba(255, 255, 255, 0.95)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              boxShadow: "0 6px 20px 0 rgba(31, 38, 135, 0.25)",
                            },
                            borderRadius:"8px"
                          }}
                        >
                          <CardContent>
                            {editId === review.id ? (
                              <Box sx={{ marginBottom: "1rem" }}>
                                <TextField
                                  value={editComments}
                                  onChange={(e) =>
                                    setEditComments(e.target.value)
                                  }
                                  fullWidth
                                  multiline
                                  rows={3}
                                  required
                                  error={editComments.trim() === ""}
                                  helperText={
                                    editComments.trim() === ""
                                      ? "Review comments are required"
                                      : ""
                                  }
                                />

                                <Box
                                  sx={{
                                    marginTop: "1rem",
                                    display: "flex",
                                    gap: "1rem",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    onClick={() => handleSaveEdit(review.id)}
                                    disabled={
                                      editComments.trim() === "" || loading
                                    }
                                    sx={{
                                      backgroundColor: "#1a237e",
                                      "&:hover": {
                                        backgroundColor: "#000051",
                                      },
                                    }}
                                  >
                                    Save
                                  </Button>
                                </Box>
                              </Box>
                            ) : (
                              <Typography variant="body1">
                                {review.reviewComments}
                              </Typography>
                            )}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "0.5rem",
                              }}
                            >
                              <IconButton
                                onClick={() =>
                                  handleEditReview(
                                    review.id,
                                    review.reviewComments
                                  )
                                }
                                disabled={loading || editId !== null}
                                sx={{
                                  "&:hover": {
                                    color: "#1a237e",
                                  },
                                }}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteReview(review.id)}
                                disabled={loading || editId !== null}
                                sx={{
                                  "&:hover": {
                                    color: "#d32f2f",
                                  },
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );
            })()}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default MovieReviewList;
