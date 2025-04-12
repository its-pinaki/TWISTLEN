import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import CustomSearchBarA from '../CustomSearchBarA/CustomSearchBarA';
import AccordianStyles from './Accordian.styles';
import { Color } from '../../../../GlobalStyles';
import styles from '../CommonCss/AllCommon.styles';
// import CustomButtonJ from '../CustomButtonJ/CustomButtonJ';
// import CustomFilterButtonJ from '../CustomFilterBottonJ/CustomFilterBottonJ';

const Accordian = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

//   const filterButtons = [
//     { name: 'All', icon: require('../../../../assets/CustomButtonJ/correct.png') },
//     { name: 'House', icon: require('../../../../assets/CustomButtonJ/house.png') },
//     { name: 'Villa', icon: require('../../../../assets/CustomButtonJ/villa.png') },
//     { name: 'Apartment', icon: require('../../../../assets/CustomButtonJ/apartment.png') },

//   ];

  const faqQuestions = [
    { question: "Why did my payment not work?", answer: "Here is why your payment might not have worked. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur ..." },
    { question: "Why are the real estate prices different?", answer: "The prices vary due to simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ..." },
    { question: "Why can’t I add a new payment method?", answer: "You might be unable to add a new payment method because Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...." },
    { question: "Why didn't I get the e-receipt after payment?", answer: "If you didn't get the e-receipt, it could be because  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...." },
    { question: "How to make a payment?", answer: "To make a payment, follow these steps... Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem." },
  ];

//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = faqQuestions.filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()));
//       setFilteredQuestions(filtered);
//     } else {
//       setFilteredQuestions(faqQuestions);
//     }
//   }, [searchQuery]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderItem = ({ item, index }) => {
    const isExpanded = expandedIndex === index;
    return (
      <View style={AccordianStyles.card}>
        <TouchableOpacity style={AccordianStyles.cardHeader} onPress={() => toggleExpand(index)}>
          <Text style={[AccordianStyles.cardTitle, styles.description]}>{item.question}</Text>
          <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color={Color.GoldenPrimary}/>
        </TouchableOpacity>
        {isExpanded && (
          <View>
            <Text style={[styles.SubDescription]}>{item.answer}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={AccordianStyles.container}>
      {/* <CustomSearchBarA onChangeText={setSearchQuery} />
      <CustomFilterButtonJ filterButtons={filterButtons}
      /> */}
      <FlatList
        data={faqQuestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};



export default Accordian;
