import { StyleSheet } from 'react-native';
import { Color, FontSize, Margin, Padding } from '../../../../GlobalStyles';

const AccordianStyles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 5,
        flex: 1,
        width: '100%', 
      },
  card: {
    backgroundColor: Color.white,
    borderRadius: 8,
    padding:30,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    // fontSize: FontSize.size_lg,
    fontWeight: 'bold',
  },

  });
  
  export default AccordianStyles;