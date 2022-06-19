import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  Image,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  Snackbar,
  Headline,
  Paragraph,
  FAB,
  Dialog,
  Badge
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import image_url from '../../../consts/image_url';
import STYLES from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function ClassDetailScreen({route, navigation}) {
  const {item} = route.params;
  // console.log(item);

  // fabs
  const [state, setState] = useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  // fabs end
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [userList, setUserList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [displayEmail, setdisplayEmail] = useState('none');

  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [viewQuiz, setViewQuiz] = useState(false);
  
  // quiz 
  const [name,setName] = useState('');
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [true_ans, setTrue_ans] = useState('');
  // quiz end

  // snackbar

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  // login api call
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  // check logins
  const [login, setlogin] = useState(1);

  // check logins end

  // rb sheets
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();

  // get object values from async storage
  const getData = async () => {
    await AsyncStorage.getItem('resturantDetail').then(value => {
      var x = JSON.parse(value);

      // splitString(x.fullname);
      setUsername(x.fullname);
      setUserid(x.id);
      getClasses(x.id);
    });
  };
  // store objcet values in async storage end
  // flat lsit

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        width: '100%',
        paddingVertical: 5,
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Text>Name : {item.fullname}</Text>
        <Text>Email : {item.email}</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: COLORS.greylight,
        }}></View>
    </TouchableOpacity>
  );
  const renderItem2 = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        width: '100%',
        paddingVertical: 5,
      }}
      onPress={() => {
        navigation.navigate('VideoScreen', {item: item});
      }
      }
      >
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Text>Video Link : {item.link}</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: COLORS.greylight,
        }}></View>
    </TouchableOpacity>
  );
  const renderItem3 = ({item}) => (
    console.log(item),
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        width: '100%',
        paddingVertical: 5,
      }}
      
      
      >
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          
        <Text>Ques. {item.name}</Text><Badge>{item.true_ans}</Badge>
        
        <Text>Option 1. {item.ans1}</Text>
        <Text>Option 2. {item.ans2}</Text>
        <Text>Option 3. {item.ans3}</Text>
        
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: COLORS.greylight,
        }}></View>
    </TouchableOpacity>
  );

  const getAllUsers = id => {
    // setloading(true);

    var InsertAPIURL = base_url + '/class/getAllUsersinClass.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      classid: item.id,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        setUserList(response);
        // console.log(response);
      })
      .catch(error => {
        alert('error' + error);
      });
  };
  // get alll videos
  const getAllVideos = id => {
    // setloading(true);

    var InsertAPIURL = base_url + '/class/getAllVideosinClass.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      classid: item.id,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        setVideoList(response);
        // console.log(response);
      })
      .catch(error => {
        alert('error' + error);
      });
  };
  // get alll quiz
  const getAllQuiz = id => {
    // setloading(true);

    var InsertAPIURL = base_url + '/class/getAllQuizinClass.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      classid: item.id,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        setQuizList(response);
        console.log(response);
      })
      .catch(error => {
        alert('error' + error);
      });
  };

  // add user
  const addUser = () => {
    // if (username.length == 0 || email.length == 0 || password.length == 0) {
    // } else {
      setloading(1);
      setdisable(1);
      var InsertAPIURL = base_url + '/class/addUserinClass.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        classid: item.id,
        fullname: fullname,
        email: email,
        password: password,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          // refRBSheet.current.close();
          // console.log(response);
          setloading(0);
          setdisable(0);
          refRBSheet.current.close();
          getAllUsers()
        })
        .catch(error => {
          alert('error' + error);
        });
    
  };
  // add Video
  const addVideo = () => {
    if (link.length == 0) {
    } 
    else {
      setloading(1);
      setdisable(1);
      var InsertAPIURL = base_url + '/class/addVideoinClass.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        classid: item.id,
        link: link,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          // refRBSheet.current.close();
          // console.log(response);
          setloading(0);
          setdisable(0);
          refRBSheet2.current.close();
          getAllVideos()
          setViewQuiz(false);
        })
        .catch(error => {
          alert('error' + error);
        });
    }
  };
  // add Quiz
  const addQuiz = () => {
    if (name.length == 0 || ans1.length == 0 || ans2.length == 0|| ans3.length == 0|| true_ans.length == 0) {
    alert('some fields are empty');
    }
    else {
     
      var InsertAPIURL = base_url + '/class/addQuizinClass.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var data = {
        classid: item.id,
        name:name,
        ans1:ans1,
        ans2:ans2,
        ans3:ans3,
        true_ans:true_ans,
       
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          
          console.log(response);
          if(response[0].message=='Quiz Added') {
            refRBSheet3.current.close();
            getAllQuiz()
            setViewQuiz(true);
            
          }
         
          // getAllVideos()
        })
        .catch(error => {
          alert('error' + error);
        });
    }
    }
   
  
  useEffect(() => {
    getAllUsers();
    getAllVideos()
    getAllQuiz()
  }, []);
  return (
    // <ScrollView>
    <View
      style={{
        // marginHorizontal: '4%',
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        height={400}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
          }}>
          <Headline>Add User</Headline>
          <Icon
            name="close"
            onPress={() => {
              refRBSheet.current.close();
            }}
            size={24}
            color={COLORS.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <TextInput
            label="Full Name"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setFullname(e);
            }}
          />
          <TextInput
            label="Email"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setEmail(e);
            }}
          />
          <TextInput
            label="Password"
            mode="flat"
            activeOutlineColor={COLORS.primary}
            style={{backgroundColor: COLORS.white}}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setPassword(e);
            }}
          />
          <Button
            mode="contained"
            color={COLORS.primary}
            contentStyle={{
              padding: 9,
              paddingHorizontal: 100,
            }}
            style={{
              alignSelf: 'center',
              borderRadius: 40,
              top: 30,
            }}
            onPress={() => {
              addUser();
            }}
            loading={loading}
            disabled={disable}>
            Add
          </Button>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        height={300}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
          }}>
          <Headline>Add Video</Headline>
          <Icon
            name="close"
            onPress={() => {
              refRBSheet2.current.close();
            }}
            size={24}
            color={COLORS.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <TextInput
            label="Add link"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setLink(e);
            }}
          />

          <Button
            mode="contained"
            color={COLORS.primary}
            contentStyle={{
              padding: 9,
              paddingHorizontal: 100,
            }}
            style={{
              alignSelf: 'center',
              borderRadius: 40,
              top: 30,
            }}
            onPress={() => {
              addVideo();
            }}
            loading={loading}
            disabled={disable}>
            Add
          </Button>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheet3}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        height={500}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
          }}>
          <Headline>Add Quiz</Headline>
          <Icon
            name="close"
            onPress={() => {
              refRBSheet3.current.close();
            }}
            size={24}
            color={COLORS.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <TextInput
            label="Add Question"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setName(e);
            }}
          />
          <TextInput
            label="Add Option 1"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setAns1(e);
            }}
          />
          <TextInput
            label="Add Option 2"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setAns2(e);
            }}
          />
          <TextInput
            label="Add Option 3"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setAns3(e);
            }}
          />
          <TextInput
            label="Correct Option"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            keyboardType="numeric"
             
            onChangeText={e => {
              setTrue_ans(e);
            }}
          />

          <Button
            mode="contained"
            color={COLORS.primary}
            contentStyle={{
              padding: 9,
              paddingHorizontal: 100,
            }}
            style={{
              alignSelf: 'center',
              borderRadius: 40,
              top: 30,
            }}
            onPress={() => {
              addQuiz();
            }}
            loading={loading}
            disabled={disable}>
            Add
          </Button>
        </View>
      </RBSheet>
      <FAB.Group
        style={{
          zIndex: 2,
        }}
        fabStyle={{
          backgroundColor: COLORS.primary,
        }}
        open={open}
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'account',
            label: 'Add User',
            onPress: () => refRBSheet.current.open(),
          },
          {
            icon: 'youtube',
            label: 'Add Video',
            onPress: () => refRBSheet2.current.open(),
          },
          {
            icon: 'ab-testing',
            label: 'Add Quiz',
            onPress: () => refRBSheet3.current.open(),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
      <View
              style={{
                flexDirection: 'row',
                marginVertical: '4%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '5%',
              }}>
              <Text
                style={{
                  fontSize: 17,
                }}>
                My Class
              </Text>
              <TouchableOpacity
                style={{
                  fontSize: 17,
                }}
                onPress={() => {
                  if(viewQuiz==false) {
                    setViewQuiz(true);
                  }
                  else {
                    setViewQuiz(false);
                  }
                }}
                
                >
                    <Badge
                    style={{
                      backgroundColor:
                      viewQuiz==false ? COLORS.light: COLORS.primary,
                      color:
                      viewQuiz==false ?  COLORS.white: COLORS.dark,
                      
                      
                    }}
                    >
                Class Quiz
                </Badge>
              </TouchableOpacity>
            </View>
        {
          viewQuiz==false ? 
          <FlatList
        data={userList}
        ListHeaderComponent={() => (
          <SafeAreaView>
            <Snackbar
              duration={200}
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={
                {
                  // label: 'Undo',
                  // onPress: () => {
                  //   // Do something
                  // },
                }
              }
              style={{
                backgroundColor: snackbarValue.color,
                marginBottom: height / 4,
                zIndex: 999,
              }}>
              {snackbarValue.value}
            </Snackbar>
            
            <View
              style={{
                felxDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                }}>
                <FastImage
                  style={{
                    width: '100%',
                    height: 200,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: image_url + '/' + item.image,

                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                // marginHorizontal: '5%',
                justifyContent: 'center',
              }}>
              <TextInput
                label="Class Name"
                mode="flat"
                style={{backgroundColor: COLORS.white, borderRadius: 40}}
                activeOutlineColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                value={item.name}
                disabled={true}
                onChangeText={e => {
                  setclassName(e);
                }}
              />
              <TextInput
                label="Class Description"
                mode="flat"
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: 40,
                  textAlignVertical: 'top',
                }}
                activeOutlineColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                multiline={true}
                clearTextOnFocus={true}
                value={item.description}
                disabled={true}
                onChangeText={e => {
                  setDescription(e);
                }}
              />
            </View>
            <Headline
              style={{
                paddingHorizontal: '3%',
              }}>
              Users List
            </Headline>
          </SafeAreaView>
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{
          marginHorizontal: '4%',
          backgroundColor: COLORS.white,
        }}
        ListFooterComponent={() => (
          <View>
            <Headline>Videos List</Headline>
            <FlatList
        data={videoList}
        
        renderItem={renderItem2}
        keyExtractor={item => item.id}
        style={{
          // marginHorizontal: '4%',
          backgroundColor: COLORS.white,
        }}
        
      />
          </View>
        )}
      />
          :
          <FlatList
        data={quizList}
        
        renderItem={renderItem3}
        keyExtractor={item => item.id}
        style={{
          marginHorizontal: '4%',
          backgroundColor: COLORS.white,
        }}
        />


        }
      
    </View>
  );
}

export default ClassDetailScreen;
