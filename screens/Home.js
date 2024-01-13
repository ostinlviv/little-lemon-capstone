import { useEffect, useState, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../database";
import { useUpdateEffect } from "../utils";
import Filters from "../components/Filters";
import { globalStyles } from "../globalStyles";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["starters", "mains", "desserts"];

const Item = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <Image
        style={styles.itemImage}
        source={{
          uri: item.image,
        }}
      />
    </View>
  );
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async () => {
    let data = [];
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      data = json.menu.map((item) => ({
        ...item,
        image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
      }));
    } catch (error) {
      console.error(error);
    }
    return data;
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        if (!menuItems.length) {
          menuItems = await fetchData();
          menuItems = await saveMenuItems(menuItems);
        }
        setData(menuItems);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        setData(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearch(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.body}>
        <View style={{ backgroundColor: "#495E57", padding: 25 }}>
          <Text style={styles.title}>Little lemon</Text>
          <View style={styles.wrapper}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitle}>Chicago</Text>
              <Text style={styles.text}>
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </Text>
            </View>
            <Image
              style={styles.image}
              source={require("../assets/hero_image.png")}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Ionicons name="md-search" size={25} color="black" />
            <TextInput
              style={styles.input}
              value={search}
              onChangeText={handleSearchChange}
            />
          </View>
        </View>
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
        <FlatList
          style={{ flex: 1, paddingHorizontal: 25 }}
          data={data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionList: {
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "MarkaziText-Regular",
    fontSize: 64,
    color: "#F4CE14",
    height: 55,
    marginTop: -15,
  },
  subtitle: {
    fontFamily: "MarkaziText-Regular",
    fontSize: 40,
    color: "white",
  },
  text: {
    fontFamily: "Karla-Regular",
    fontSize: 16,
    color: "white",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    borderRadius: 16,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
    gap: 10,
  },
  input: {
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#edefee",
    gap: 20,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Karla-Regular",
    marginBottom: 12,
  },
  itemDescription: {
    fontSize: 16,
    fontFamily: "Karla-Regular",
    color: "#333",
    fontWeight: "400",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: "Karla-Regular",
    fontWeight: "bold",
  },
});

export default Home;
