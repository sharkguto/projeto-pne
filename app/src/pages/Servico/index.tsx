import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
// import api from '../../services/api';
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { Feather as IconF } from "@expo/vector-icons";

import Button from "../../components/Button";
import Logo from "../../components/Logo";

import { Container, Title, TripList } from "./styles";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

const Servico = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const route = useRoute();
  const routeParams = route.params as Params;
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    const dataItem: any = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    setItems(dataItem);
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Oooops...",
          "Precisamos de sua permissão para obter a localização"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      console.log(latitude, longitude);

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  function handleSelectItem(id: number) {
    // const alreadySelected = selectedItems.findIndex((item) => item === id);

    // if (alreadySelected >= 0) {
    //   const filteredItems = selectedItems.filter((item) => item !== id);

    //   setSelectedItems(filteredItems);
    // } else {
    //   setSelectedItems([...selectedItems, id]);
    // }
    if (id == 0) {
      let data: any = [
        {
          id: 1,
          name: "Descanso",
          image_url: "bed",
          latitude: -23.2177829,
          longitude: -45.910646,
        },
        {
          id: 2,
          name: "Mercado",
          image_url: "bullseye",
          latitude: -23.2179142,
          longitude: -45.9032341,
        },
        {
          id: 3,
          name: "Mercado",
          image_url: "shopping-basket",
          latitude: -23.2258907,
          longitude: -45.9104392,
        },
        {
          id: 4,
          name: "Posto",
          image_url: "gas-pump",
          latitude: -23.2266604,
          longitude:-45.9006931,
        },
        {
          id: 5,
          name: "Área de risco",
          image_url: "user-ninja",
          latitude: -23.2286603,
          longitude: -45.9080345,
        },
      ];
      setPoints(data);
    }

    if (id == 1) {
      let data: any = [
        {
          id: 1,
          name: "Descanso",
          image_url: "utensils",
          latitude: -23.2177829,
          longitude: -45.910646,
        },
      ];
      setPoints(data);
    }

    if (id == 2) {
      let data: any = [
        {
          id: 2,
          name: "Borracharia",
          image_url: "bullseye",
          latitude: -23.2179142,
          longitude: -45.9032341,
        },
      ];
      setPoints(data);
    }

    if (id == 3) {
      let data: any = [
        {
          id: 3,
          name: "Descanso",
          image_url: "bed",
          latitude: -23.2258907,
          longitude: -45.9104392,
        },
      ];
      setPoints(data);
    }

    if (id == 4) {
      let data: any = [
        {
          id: 4,
          name: "Posto",
          image_url: "gas-pump",
          latitude: -23.2266604,
          longitude:-45.9006931,
        }
      ];
      setPoints(data);
    }

    if (id == 5) {
      let data: any = [
        {
          id: 5,
          name: "Área de risco",
          image_url: "user-ninja",
          latitude: -23.2286603,
          longitude: -45.9080345,
        }
      ];
      setPoints(data);
    }




  }

  useEffect(() => {
    let data: any = [
      {
        id: 1,
        name: "Alimentação",
        image_url: "utensils",
        latitude: -23.2177829,
        longitude: -45.910646,
      },
      {
        id: 2,
        name: "Borracharia",
        image_url: "bullseye",
        latitude: -23.2179142,
        longitude: -45.9032341,
      },
      {
        id: 3,
        name: "Descanso",
        image_url: "bed",
        latitude: -23.2258907,
        longitude: -45.9104392,
      },
      {
        id: 4,
        name: "Posto",
        image_url: "gas-pump",
        latitude: -23.2266604,
        longitude:-45.9006931,
      },
      {
        id: 5,
        name: "Área de risco",
        image_url: "user-ninja",
        latitude: -23.2286603,
        longitude: -45.9080345,
      },
    ];
    setPoints(data);
  }, [selectedItems]);

  function goNavigatePoints() {
    navigation.navigate("Points");
  }
  function handleNavigateBack() {
    navigation.goBack();
  }
  function handleNavigateToDetail(id: number) {
    navigation.navigate("Detail", { point_id: id });
  }

  return (
    <>
      <Logo></Logo>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <IconF name="arrow-left" size={48} color="#000" />
            </TouchableOpacity>
            <Title></Title>
            <Text></Text>
          </View>
          <View style={styles.mapContainer}>
            {initialPosition[0] !== 0 && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: initialPosition[0],
                  longitude: initialPosition[1],
                  latitudeDelta: 0.014,
                  longitudeDelta: 0.014,
                }}
                showsUserLocation
                loadingEnabled
              >
                {/* <Marker
                  onPress={() => handleNavigateToDetail(1)}
                  style={styles.mapMarker}
                  coordinate={{
                    latitude: -23.1505747,
                    longitude: -45.904405,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Icon name="utensils" size={26} color="#fff" />
                    <Text style={styles.mapMarkerTitle}>Restaurante</Text>
                  </View>
                </Marker> */}
                {points.map((point) => (
                  <Marker
                    key={String(point.id)}
                    style={styles.mapMarker}
                    onPress={() => handleNavigateToDetail(point.id)}
                    coordinate={{
                      latitude: point.latitude,
                      longitude: point.longitude,
                    }}
                  >
                    <ImageBackground
                      source={require("../../assets/marker.png")}
                      style={styles.mapMarkerContainer}
                    >
                      <Icon name={point.image_url} size={21} color="#fff" />
                    </ImageBackground>
                  </Marker>
                ))}
              </MapView>
            )}
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(0)}
              activeOpacity={0.6}
            >
              <Icon name="map-marker-alt" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Tudo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(1)}
              activeOpacity={0.6}
            >
              <Icon name="utensils" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Alimentação</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(2)}
              activeOpacity={0.6}
            >
              <Icon name="bullseye" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Borracharia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(3)}
              activeOpacity={0.6}
            >
              <Icon name="bed" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Descanso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(5)}
              activeOpacity={0.6}
            >
              <Icon name="shower" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Banho</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(1)}
              activeOpacity={0.6}
            >
              <Icon name="shopping-basket" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Mercado</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(1)}
              activeOpacity={0.6}
            >
              <Icon name="clinic-medical" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Farmacia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(4)}
              activeOpacity={0.6}
            >
              <Icon name="gas-pump" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Combustível</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(5)}
              activeOpacity={0.6}
            >
              <Icon name="user-ninja" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Área de Risco</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelectItem(1)}
              activeOpacity={0.6}
            >
              <Icon name="plus-square" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Novo Serviço</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fbd762",
    position: "relative",
  },
  header: {
    paddingHorizontal: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },

  mapContainer: {
    flex: 1,
    width: "109%",
    marginLeft: -16,
    borderRadius: 0,
    overflow: "hidden",
    marginTop: 16,
    maxHeight: 300,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 54,
    height: 54,
    paddingTop: 13,
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: "cover",
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    color: "#FFF",
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: "row",
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "#fbd762",
    height: "100%",
  },

  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 0,
  },

  item: {
    backgroundColor: "#CF2A27",
    borderWidth: 1,
    borderColor: "#000",
    height: 90,
    width: 110,
    borderRadius: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: -1,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
  },
});

export default Servico;
