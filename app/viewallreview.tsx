import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState([]);

  // ✅ Fetch review data with image links
  useEffect(() => {
    // Example static data with direct image URLs
    const data = [
      {
        id: '1',
        name: 'Veronika',
        rating: 5,
        text: 'This is a sample review for the first user.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: '2',
        name: 'John',
        rating: 4,
        text: 'Another review with a different picture.',
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      },
      {
        id: '3',
        name: 'Maria',
        rating: 5,
        text: 'Great service! Highly recommended.',
        avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      },
      {
        id: '4',
        name: 'David',
        rating: 3,
        text: 'It was okay, could be better.',
        avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
      },
    ];
    setReviews(data);
  }, []);

  const renderStars = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <Ionicons key={i} name="star" size={16} color="#FFA500" style={{ marginRight: 2 }} />
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textArea}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.stars}>{renderStars(item.rating)}</View>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Reviews</Text>

      {/* 🔑 FlatList inside ScrollView – no internal scroll */}
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}     // 👈 disables FlatList's own scrolling
      />

      {/* You can add more components below if you want */}
      <Text style={{ marginTop: 20, textAlign: 'center', color: '#999' }}>
        End of Reviews
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  textArea: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
