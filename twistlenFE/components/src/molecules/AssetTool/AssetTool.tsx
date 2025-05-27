import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const AssetTool = () => {
  // User data
  const [balance, setBalance] = useState(10000); // Fake money
  const [portfolio, setPortfolio] = useState([]);
  const [selectedTab, setSelectedTab] = useState('market');

  // Sample assets
  const assets = [
    { id: 1, name: 'Tech Stocks', icon: '📈', price: 150, change: '+2.4%' },
    { id: 2, name: 'Bitcoin', icon: '₿', price: 42000, change: '-1.2%' },
    { id: 3, name: 'Real Estate', icon: '🏠', price: 350000, change: '+0.8%' },
    { id: 4, name: 'NFT Collection', icon: '🖼️', price: 2.5, change: '+15%' },
  ];

  // Buy asset function
  const buyAsset = (asset) => {
    if (balance >= asset.price) {
      setBalance(balance - asset.price);
      setPortfolio([...portfolio, asset]);
      alert(`Bought ${asset.name}!`);
    } else {
      alert('Not enough balance!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.balance}>${balance.toLocaleString()}</Text>
        <Text style={styles.title}>Virtual Investment Game</Text>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'market' && styles.activeTab]}
          onPress={() => setSelectedTab('market')}
        >
          <Text>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'portfolio' && styles.activeTab]}
          onPress={() => setSelectedTab('portfolio')}
        >
          <Text>Portfolio ({portfolio.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setSelectedTab('leaderboard')}
        >
          <Text>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      {selectedTab === 'market' && (
        <ScrollView style={styles.assetList}>
          {assets.map((asset) => (
            <TouchableOpacity key={asset.id} style={styles.assetCard} onPress={() => buyAsset(asset)}>
              <Text style={styles.assetIcon}>{asset.icon}</Text>
              <View style={styles.assetInfo}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetPrice}>${asset.price.toLocaleString()}</Text>
              </View>
              <Text style={[styles.assetChange, { color: asset.change.startsWith('+') ? 'green' : 'red' }]}>
                {asset.change}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {selectedTab === 'portfolio' && (
        <View style={styles.portfolio}>
          {portfolio.length > 0 ? (
            portfolio.map((asset, index) => (
              <View key={index} style={styles.portfolioItem}>
                <Text>{asset.icon} {asset.name}</Text>
                <Text>${asset.price.toLocaleString()}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Your portfolio is empty!</Text>
          )}
        </View>
      )}

      {selectedTab === 'leaderboard' && (
        <View style={styles.leaderboard}>
          <Text style={styles.sectionTitle}>Top Investors</Text>
          <View style={styles.leaderboardItem}>
            <Text>1. CryptoKing - $1,240,000</Text>
          </View>
          <View style={styles.leaderboardItem}>
            <Text>2. WallStreetWolf - $980,500</Text>
          </View>
        </View>
      )}

      {/* Fake Chart (Placeholder) */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Market Trends</Text>
        <Image 
          source={{ uri: 'https://via.placeholder.com/300x150?text=Price+Chart' }} 
          style={styles.chartImage} 
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  title: {
    fontSize: 18,
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3498db',
  },
  assetList: {
    flex: 1,
  },
  assetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assetIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontWeight: 'bold',
  },
  assetPrice: {
    color: '#666',
  },
  assetChange: {
    fontWeight: 'bold',
  },
  portfolio: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  portfolioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  leaderboard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  leaderboardItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  chartTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
});

export default AssetTool;