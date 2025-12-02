"# Spotify Clone - API Contracts & Integration Plan

## Current Implementation Status

### ✅ Frontend (Completed)
- **Pages**: Home, Search, Library, Playlist Detail, Liked Songs
- **Components**: Sidebar, Player, TrackList, PlaylistCard
- **Features**: 
  - Navigation between pages
  - Music player with play/pause/next/previous
  - Volume control
  - Progress bar
  - Shuffle and repeat modes
  - Search functionality
  - Category browsing
  - Playlist viewing

### 🔄 Mock Data (Current)
Location: `/app/frontend/src/data/mockData.js`
- `featuredPlaylists` - 6 sample playlists
- `recentlyPlayed` - 4 recent items
- `mockTracks` - 8 sample tracks with demo audio URLs
- `categories` - 8 music categories

**Note**: Currently using free demo MP3 files from soundhelix.com

---

## Backend Integration Plan

### 1. Database Models (MongoDB)

#### User Model
```python
{
  \"_id\": ObjectId,
  \"username\": str,
  \"email\": str,
  \"created_at\": datetime,
  \"updated_at\": datetime
}
```

#### Playlist Model
```python
{
  \"_id\": ObjectId,
  \"name\": str,
  \"description\": str,
  \"image\": str (URL),
  \"owner_id\": ObjectId (ref: User),
  \"tracks\": [ObjectId] (ref: Track),
  \"is_public\": bool,
  \"created_at\": datetime,
  \"updated_at\": datetime
}
```

#### Track Model
```python
{
  \"_id\": ObjectId,
  \"name\": str,
  \"artist\": str,
  \"album\": str,
  \"duration\": str,
  \"duration_ms\": int,
  \"image\": str (URL),
  \"audio_url\": str (URL),
  \"created_at\": datetime
}
```

#### LikedSong Model
```python
{
  \"_id\": ObjectId,
  \"user_id\": ObjectId (ref: User),
  \"track_id\": ObjectId (ref: Track),
  \"created_at\": datetime
}
```

---

### 2. API Endpoints

#### Playlists
- `GET /api/playlists` - Get all playlists (featured + user's)
- `GET /api/playlists/:id` - Get playlist details with tracks
- `POST /api/playlists` - Create new playlist
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist
- `POST /api/playlists/:id/tracks` - Add track to playlist
- `DELETE /api/playlists/:id/tracks/:trackId` - Remove track from playlist

#### Tracks
- `GET /api/tracks` - Get all tracks
- `GET /api/tracks/:id` - Get track details
- `GET /api/tracks/search?q=query` - Search tracks
- `POST /api/tracks` - Add new track (admin)

#### Liked Songs
- `GET /api/liked-songs` - Get user's liked songs
- `POST /api/liked-songs/:trackId` - Like a track
- `DELETE /api/liked-songs/:trackId` - Unlike a track
- `GET /api/liked-songs/check/:trackId` - Check if track is liked

#### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id/playlists` - Get playlists by category

#### User (Optional for MVP)
- `GET /api/users/me` - Get current user profile
- `GET /api/users/me/playlists` - Get user's playlists
- `GET /api/users/me/recently-played` - Get recently played tracks

---

### 3. Frontend-Backend Integration

#### Replace Mock Data
**File**: `/app/frontend/src/data/mockData.js`
- Remove mock data
- Create API service file: `/app/frontend/src/services/api.js`

#### API Service Structure
```javascript
// /app/frontend/src/services/api.js
const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

export const playlistAPI = {
  getAll: () => axios.get(`${API_URL}/playlists`),
  getById: (id) => axios.get(`${API_URL}/playlists/${id}`),
  create: (data) => axios.post(`${API_URL}/playlists`, data),
  // ... more methods
};

export const trackAPI = {
  search: (query) => axios.get(`${API_URL}/tracks/search?q=${query}`),
  // ... more methods
};
```

#### Update Components
- **Home.jsx**: Fetch playlists from API instead of mockData
- **Search.jsx**: Call trackAPI.search() for real search
- **Library.jsx**: Fetch user's playlists from API
- **Playlist.jsx**: Fetch playlist details from API
- **LikedSongs.jsx**: Fetch liked songs from API

---

### 4. Authentication (Optional for MVP)

If authentication is needed:
- Use JWT tokens
- Add login/signup pages
- Store user session
- Protect routes requiring authentication

---

### 5. File Upload (For Custom Tracks)

If users can upload their own music:
- Implement chunked file upload for audio files
- Store files in `/app/backend/uploads` or cloud storage
- Add endpoints for file upload
- Update Track model with file path

---

## Implementation Priority

### Phase 1: Basic Backend (Recommended Next)
1. Create Track, Playlist, LikedSong models
2. Implement CRUD endpoints for playlists
3. Implement liked songs endpoints
4. Replace frontend mock data with API calls

### Phase 2: Enhanced Features (Optional)
1. User authentication
2. Create/edit playlists from frontend
3. Search functionality
4. Recently played tracking

### Phase 3: Advanced Features (Optional)
1. File upload for custom tracks
2. Playlist sharing
3. Social features (follow users, share playlists)
4. Recommendations algorithm

---

## Current Audio Playback

**Library**: HTML5 Audio API (native)
**Source**: Demo MP3 files from soundhelix.com

### To Use Real Music:
1. **Option A**: Spotify Web API (requires Premium for playback)
2. **Option B**: User-uploaded files (requires file upload implementation)
3. **Option C**: YouTube embedded player (current fallback)
4. **Option D**: Free music APIs (Jamendo, FMA, etc.)

---

## Notes

- All audio playback is handled client-side via PlayerContext
- Audio state (play/pause, progress, volume) is managed in React Context
- No backend required for audio playback itself
- Backend only needed for data persistence (playlists, likes, etc.)
"