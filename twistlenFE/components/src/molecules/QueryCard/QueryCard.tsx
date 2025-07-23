import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface MetaInfo {
  user?: string;
  timeAgo?: string;
  views?: number;
}

interface Tag {
  label: string;
  value: string;
  icon?: string;
  color?: string;
}

interface QueryCardProps {
  title: string;
  meta?: MetaInfo;
  tags?: Tag[];
  onEdit?: () => void;
  onFollow?: () => void;
  editable?: boolean;
  followable?: boolean;
}

const QueryCard: React.FC<QueryCardProps> = ({
  title,
  meta,
  tags = [],
  onEdit,
  onFollow,
  editable = true,
  followable = true,
}) => {
  return (
    <View style={styles.card}>
      {/* Title Row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>🔍 {title}</Text>
        <View style={styles.actions}>
          {editable && (
            <TouchableOpacity onPress={onEdit} style={styles.editButton}>
              <Text style={styles.editText}>📝 Edit Query</Text>
            </TouchableOpacity>
          )}
          {followable && (
            <TouchableOpacity onPress={onFollow} style={styles.followButton}>
              <Text style={styles.followText}>🔔 Follow</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Meta Info */}
      {meta && (
        <View style={styles.metaRow}>
          {meta.user && <Text style={styles.metaText}>👤 Asked by {meta.user}</Text>}
          {meta.timeAgo && <Text style={styles.metaText}>⏰ {meta.timeAgo}</Text>}
          {meta.views !== undefined && <Text style={styles.metaText}>👁️ {meta.views} views</Text>}
        </View>
      )}

      {/* Tags Row */}
      <View style={styles.tagsRow}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag, tag.color && { borderColor: tag.color }]}>
            <Text style={styles.tagLabel}>
              {tag.icon && `${tag.icon} `}{tag.label}:
              <Text style={styles.tagValue}> {tag.value}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 10,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#e0ebff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
  },
  editText: {
    color: '#2563eb',
    fontSize: 12,
  },
  followButton: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followText: {
    fontSize: 12,
    color: '#374151',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 12,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  tagLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  tagValue: {
    fontWeight: 'bold',
    color: '#111827',
  },
});

export default QueryCard;
