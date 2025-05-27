import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default function Checkout() {
  const [selectedDate, setSelectedDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Product Title', description: 'Product Description', price: 250, quantity: 1 },
    { id: 2, title: 'Product Title', description: 'Product Description', price: 250, quantity: 1 },
  ]);

  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = 100;
  const delivery = 100;
  const grandTotal = subtotal + gst + delivery;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <View style={[styles.mainContent, { flexDirection: isWide ? 'row' : 'column' }]}>
        {/* Left Column: Form */}
        <View style={[styles.column, { marginRight: isWide ? 12 : 0 }]}>
          {/* Delivery Info */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>Delivery Information</Text>
            {['First Name', 'Last Name', 'Email', 'Phone', 'Country', 'State', 'City', 'Zip Code', 'Address'].map(
              (placeholder) => (
                <TextInput key={placeholder} style={styles.input} placeholder={placeholder} />
              )
            )}
          </View>

          {/* Schedule Delivery */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>Schedule Delivery</Text>
            {/* <DatePicker
              style={{ width: '100%' }}
              date={selectedDate}
              mode="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => setSelectedDate(date)}
              customStyles={{
                dateInput: styles.dateInput,
              }}
            /> */}
          </View>

          {/* Payment Methods */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>Payment Methods</Text>
            {['Cash on Delivery', 'Online Payment', 'POS on Delivery'].map((method) => (
              <TouchableOpacity
                key={method}
                onPress={() => setPaymentMethod(method)}
                style={styles.radioContainer}
              >
                <View style={[styles.radio, paymentMethod === method && styles.radioSelected]} />
                <Text>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Right Column: Order Summary */}
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.subHeader}>Order Summary</Text>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/60' }}
                  style={styles.productImage}
                />
                <View style={{ flex: 1 }}>
                  <Text>{item.title}</Text>
                  <Text>{item.description}</Text>
                  <Text>₹ {item.price}</Text>
                </View>
                <View style={styles.qtyControl}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyButton}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyButton}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={styles.priceRow}><Text>Subtotal</Text><Text>₹ {subtotal}</Text></View>
            <View style={styles.priceRow}><Text>GST</Text><Text>₹ {gst}</Text></View>
            <View style={styles.priceRow}><Text>Delivery Charge</Text><Text>₹ {delivery}</Text></View>
            <View style={styles.priceRow}><Text style={styles.total}>Grand Total</Text><Text style={styles.total}>₹ {grandTotal}</Text></View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  mainContent: {
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dateInput: {
    borderRadius: 8,
    borderColor: '#ccc',
    alignItems: 'flex-start',
    paddingLeft: 10,
    height: 44,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#333',
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 4,
    marginHorizontal: 4,
  },
  qtyText: {
    minWidth: 20,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  total: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  confirmButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
