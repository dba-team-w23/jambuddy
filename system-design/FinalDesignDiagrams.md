# System Design for Final Course Submission

## Overall Context

```mermaid
graph TD
  A[Musician] -->|Uses| B[JamBuddy]
  C[Non-Musician] -->|Uses| B[JamBuddy]

  subgraph "JamBuddy"
    style B fill:#D1EFFF,stroke:#000000,stroke-width:2px;
    B(JamBuddy) -->|Provides| D[Personal Ads]
    style D fill:#D1EFFF,stroke:#000000,stroke-width:2px;
    B -->|Allows| E[Audio/Video Samples]
    style E fill:#D1EFFF,stroke:#000000,stroke-width:2px;
    B -->|Includes| F[Review System]
    style F fill:#D1EFFF,stroke:#000000,stroke-width:2px;
    B -->|Searches| G[User Profiles]
    style G fill:#D1EFFF,stroke:#000000,stroke-width:2px;
  end

  subgraph "External Systems"
    style H fill:#D1EFFF,stroke:#000000,stroke-width:2px;
    H[Other music-related websites/services] -->|Interacts with| B
  end
  ```


