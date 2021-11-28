import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce/lib';
import { GET_REPOSITORIES } from '../qraphql/queries';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  filter: {
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    backgroundColor: '#FFF'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sorting, setSorting] = useState(['CREATED_AT', 'DESC']);
  const [selected, setSelected] = useState();
  const [filter, setFilter] = useState('');
  const [value] = useDebounce(filter, 500);

  const variables = {
    searchKeyword: value,
    orderBy: sorting[0],
    orderDirection: sorting[1],
    first: 8
  };

  const repositories = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network'
  });

  if (repositories.loading) {
    return <Text>Loading...</Text>;
  }

  const fetchMore = repositories.fetchMore;

  const handleFetchMore = () => {
    const canFetchMore = repositories.data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: repositories.data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };


  return (
    <RepositoryListContainer 
      repositories={repositories.data.repositories} 
      setSorting={setSorting} 
      selected={selected}
      setSelected={setSelected}
      filter={filter}
      setFilter={setFilter}
      handleFetchMore={handleFetchMore}
    />
  );
};

export const RepositoryListContainer = ({ repositories, setSorting, selected, setSelected, setFilter, filter, handleFetchMore }) => {
  const repositoryNodes = repositories.edges.map(edge => edge.node);
  const renderItem = (repository) => (
    <RepositoryItem repository={repository} />
  );

  const onEndReach = () => {
    handleFetchMore();
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => 
        <View>
          <TextInput style={styles.filter} value={filter} onChangeText={setFilter} placeholder="search" />
          <SelectComponent setSorting={setSorting} selected={selected} setSelected={setSelected} />
        </View>
    }
    />
  );
};

const SelectComponent = ({ setSorting, setSelected, selected }) => {
  const updateSorting = (itemValue) => {
    setSelected(itemValue);
    switch (itemValue) {
      case 'latest':
        setSorting(['CREATED_AT', 'DESC']);
        break;
      case 'highest':
        setSorting(['RATING_AVERAGE', 'DESC']);
        break;
      case 'lowest':
        setSorting(['RATING_AVERAGE', 'ASC']);
        break;
      default:
        break;
    }
  };

  return(
    <Picker style={{height: 50}}
      selectedValue={selected}
      onValueChange={(itemValue) => updateSorting(itemValue)
      }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export default RepositoryList;