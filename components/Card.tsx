import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the props type
interface SocialMediaCardProps {
  username: string;
  imageUrl: string;
  likes: number;
  caption: string;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ username, imageUrl, likes, caption }) => {
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
        style={{height:40,width:40,left:280,top:-250,borderRadius:10}} 
        
      />
      <Text style={{color:'black',fontWeight:900,top:-280,left:50}}>SHAUN DSOUZA</Text>

      <Image 
        source={require('../assets/post.png')}
        style={{height:250,width:330,left:-5,top:-260,borderRadius:10}} 
        
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={24} color="red" />
          <Text style={styles.likeCount}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{top:-265,left:110}}>
        <Ionicons name="chatbubble-outline" size={24} color="black" />

        </TouchableOpacity>
        <TouchableOpacity style={{top:-265}}>
          <Ionicons name="paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.caption}>{caption}</Text>
      <TouchableOpacity>
        <Text style={styles.readMore}>Read more</Text>
      </TouchableOpacity>
      <Text style={{color:'black',top:-320,left:0}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto inventore, perferendis voluptates repudiandae et .</Text>
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
    height:430,width:360,
    padding:20,
    top:50,
    left:5,
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
    top:-265,
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
});

export default SocialMediaCard;
