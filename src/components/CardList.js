import React from 'react';
import { View, FlatList } from 'react-native';
import Card from './Card';

const CardList = ({
  data,
  cardAction,
  viewAction,
  bookmarkAction,
  shareAction,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card
            item={item}
            cardAction={cardAction}
            viewAction={viewAction}
            bookmarkAction={bookmarkAction}
            shareAction={shareAction}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center',
  },
};

export default CardList;
