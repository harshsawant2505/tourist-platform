import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the props type
interface SocialMediaCardProps {
  username: string;
  imageUrl: string;
  likes: number;
  caption: string;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ username, imageUrl, likes, caption }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isCommentDropdownVisible, setIsCommentDropdownVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handlePostComment = () => {
    if (comment.trim()) {
      setComments(prevComments => [...prevComments, comment]);
      setComment(''); // Clear the input field after posting
    }
  };

  const openInstagram = async () => {
    const instagramURL = 'instagram://app';
    const webURL = 'https://www.instagram.com';
    
    try {
      const supported = await Linking.canOpenURL(instagramURL);
      if (supported) {
        await Linking.openURL(instagramURL);
      } else {
        await Linking.openURL(webURL);
      }
    } catch (error) {
      Alert.alert('Unable to open Instagram');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/40' }} 
          style={styles.avatar}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.mainImage}
      />
      <Image 
        source={require('../assets/socialb.png')}
        style={{ height: 40, width: 40, left: 280, top: -250, borderRadius: 10 }} 
      />
      <Text style={{ color: 'black', fontWeight: '900', top: -280, left: 50 }}>SHAUN DSOUZA</Text>

      <Image 
        source={require('../assets/post.png')}
        style={{ height: 250, width: 330, left: -5, top: -260, borderRadius: 10 }} 
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"}
            size={24} 
            color={isLiked ? "red" : "black"} 
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ top: -265, left: 100 }} onPress={() => setIsCommentDropdownVisible(!isCommentDropdownVisible)}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>

       

        <TouchableOpacity style={{ top: -265 }} onPress={openInstagram}>
          <Ionicons name="paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.caption}>{caption}</Text>
      <TouchableOpacity>
        <Text style={styles.readMore}>Read more</Text>
      </TouchableOpacity>
      <Text style={{ color: 'black', top: -320, left: 0 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto inventore, perferendis voluptates repudiandae et.
      </Text>

      {/* Comment Dropdown */}
      {isCommentDropdownVisible && (
        <View style={styles.commentDropdown}>
          <Text style={styles.commentDropdownTitle}>Comments</Text>

          {/* Display existing comments */}
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <Text key={index} style={styles.commentText}>• {c}</Text>
            ))
          ) : (
            <Text style={styles.noComments}>No comments yet. Be the first!</Text>
          )}

          {/* Input for adding a new comment */}
          <View style={styles.commentInputWrapper}>
            <TextInput 
              style={styles.commentInput}
              placeholder="Write a comment..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.postButton} onPress={handlePostComment}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 430,
    width: 360,
    padding: 20,
    top: 50,
    left: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -265,
  },
  likeCount: {
    marginLeft: 5,
  },
  caption: {
    marginTop: 10,
  },
  readMore: {
    color: 'gray',
    marginTop: 5,
  },
  commentDropdown: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  commentDropdownTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    marginBottom: 5,
  },
  noComments: {
    color: '#777',
  },
  commentInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  postButton: {
    marginLeft: 10,
    backgroundColor: '#0084ff',
    borderRadius: 5,
    padding: 10,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  readCommentsText: {
    fontSize: 12,
    marginLeft: 5,
    color: 'gray',
    top: -4,
  },
});

export default SocialMediaCard;
