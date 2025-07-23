import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface FeatureTag {
  icon?: string;
  label: string;
}

interface ProductDealCardProps {
  verifiedBy?: string;
  productName: string;
  price: string;
  features: FeatureTag[];
  score?: string;
  scoreColor?: string;
  onViewDeal?: () => void;
  onWhyPicked?: () => void;
}

const ProductDealCard: React.FC<ProductDealCardProps> = ({
  verifiedBy = 'EarnArena',
  productName,
  price,
  features,
  score,
  scoreColor = '#22c55e',
  onViewDeal,
  onWhyPicked,
}) => {
  return (
    <View style={styles.cardWrapper}>
      <Text style={styles.verifiedText}>✅ Verified by {verifiedBy}</Text>

      <View style={styles.cardBox}>
        <View style={styles.headerRow}>
          <Text style={styles.productName}>🖥️ {productName}</Text>
          <Text style={styles.priceTag}>{price}</Text>
        </View>

        {/* Features */}
        <View style={styles.featureRow}>
          {features.map((f, idx) => (
            <Text key={idx} style={styles.featureText}>
              {f.icon && `${f.icon} `}{f.label}
            </Text>
          ))}
        </View>

        {/* CTA & Score */}
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={onViewDeal} style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Deal</Text>
          </TouchableOpacity>
          <Text style={styles.scoreText}>Performance Score: <Text style={[styles.scoreValue, { color: scoreColor }]}>{score}</Text></Text>
        </View>

        {/* Link */}
        <TouchableOpacity onPress={onWhyPicked} style={styles.linkTopRight}>
          <Text style={styles.linkText}>Why we picked this</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 10,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  verifiedText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
    marginBottom: 6,
  },
  cardBox: {
    backgroundColor: '#f0f6ff',
    padding: 10,
    borderRadius: 10,
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceTag: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 14,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#374151',
    marginRight: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
  },
  scoreText: {
    fontSize: 13,
    color: '#374151',
  },
  scoreValue: {
    fontWeight: 'bold',
  },
  linkTopRight: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  linkText: {
    color: '#2563eb',
    fontSize: 12,
  },
});

export default ProductDealCard;
