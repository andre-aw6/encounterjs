import React, { useState } from "react";
import { FlatList } from "react-native";
import ProductItem from "./ProductItem";

export default (props) => {
  const [productsShow, setProductsShow] = useState([]);

  const onViewRef = React.useRef(({ viewableItems }) => {
    setProductsShow(viewableItems.map((i) => i.index));
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 20 });

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={props.ids}
      keyExtractor={(i) => i.toString()}
      horizontal={true}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      renderItem={({ item, index, separators }) => {
        return (
          <ProductItem
            showPrice={!props.spotlight && !props.hidePrice}
            noFlex={props.noFlex}
            showRemember={props.showRemember}
            numberOfLines={2}
            isLoading={props.isLoading}
            spotlight={props.spotlight}
            id={item}
            key={index}
            showImage={productsShow.includes(index)}
          />
        );
      }}
    />
  );
};
