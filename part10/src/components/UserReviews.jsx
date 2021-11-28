import React from "react";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { GET_USER_REVIEWS } from "../qraphql/queries";
import { ReviewItem} from "./RepositoryDetails";
import { FlatList, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const UserReviews = () => {
  const reviews = useQuery(GET_USER_REVIEWS);
  if (reviews.loading) {
    return <Text>Loading...</Text>;
  }
  const ItemSeparator = () => <View style={styles.separator} />;

  const renderItem = (review) => (
      <ReviewItem review={review.item} userReviews={true} />
  );

  const reviewNodes = reviews.data.authorizedUser.reviews.edges.map(edge => edge.node);
  return (
    <FlatList 
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default UserReviews;