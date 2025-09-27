import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHeart, FaShareAlt, FaLeaf, FaClock, FaUser, FaChefHat } from 'react-icons/fa';
import { GiChefToque, GiCookingPot } from 'react-icons/gi';
import './About.css';
import img1 from '../Images/img1.png';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <img src={img1} alt="Food preparation" className="about-hero-image" />
        <div className="about-hero-content">
          <h1 className="about-hero-title">Kitchen Tales</h1>
          <div className="about-hero-divider"></div>
          <h2 className="about-hero-subtitle">A Recipe Sharing Community</h2>
          <p className="about-hero-tagline">Where culinary stories come to life</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="about-content">
        {/* Introduction Section */}
        <section className="about-section">
          <h2 className="about-section-title">Our Story</h2>
          <div className="about-description">
            <p>
              Welcome to <strong>Kitchen Tales</strong>, your ultimate destination for culinary inspiration 
              and community-driven recipe sharing. Born from a passion for cooking and a love for sharing 
              delicious stories, we've created a platform where food enthusiasts from around the world 
              can connect, learn, and grow together.
            </p>
            <p>
              Our journey began with a simple idea: cooking should be accessible, enjoyable, and 
              social. Whether you're a seasoned chef or just starting your culinary adventure, 
              Kitchen Tales provides the perfect environment to explore, create, and share your 
              favorite recipes.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="about-section">
          <h2 className="about-section-title">Why Choose Kitchen Tales?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaUtensils className="feature-icon" />
              <h3 className="feature-title">Diverse Recipes</h3>
              <p className="feature-description">
                Discover thousands of recipes from various cuisines, dietary preferences, 
                and skill levels. From quick weekday meals to elaborate weekend feasts.
              </p>
            </div>

            <div className="feature-card">
              <FaShareAlt className="feature-icon" />
              <h3 className="feature-title">Share & Connect</h3>
              <p className="feature-description">
                Share your culinary creations with a supportive community. Get feedback, 
                tips, and make friends with fellow food lovers.
              </p>
            </div>

            <div className="feature-card">
              <FaHeart className="feature-icon" />
              <h3 className="feature-title">Save Favorites</h3>
              <p className="feature-description">
                Create your personal collection of favorite recipes. Never lose track of 
                those amazing dishes you want to make again and again.
              </p>
            </div>

            <div className="feature-card">
              <GiChefToque className="feature-icon" />
              <h3 className="feature-title">Learn & Grow</h3>
              <p className="feature-description">
                Improve your cooking skills with detailed instructions, cooking tips, 
                and techniques shared by our community of home cooks and professional chefs.
              </p>
            </div>

            <div className="feature-card">
              <FaLeaf className="feature-icon" />
              <h3 className="feature-title">Seasonal Inspiration</h3>
              <p className="feature-description">
                Find recipes perfect for every season, holiday, and special occasion. 
                Stay inspired throughout the year with our curated collections.
              </p>
            </div>

            <div className="feature-card">
              <FaClock className="feature-icon" />
              <h3 className="feature-title">Time-Saving Tips</h3>
              <p className="feature-description">
                Discover quick recipes, meal prep ideas, and time-saving techniques 
                to make cooking fit seamlessly into your busy lifestyle.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Recipes Shared</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Community Members</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100+</div>
            <div className="stat-label">Cuisines Represented</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Culinary Inspiration</div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2 className="about-section-title">Meet Our Community</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar" style={{background: '#820300', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem'}}>
                <GiCookingPot />
              </div>
              <h3 className="team-name">Home Cooks</h3>
              <p className="team-role">Recipe Contributors</p>
              <p className="team-bio">
                Everyday people sharing their family recipes, kitchen experiments, 
                and culinary successes with the community.
              </p>
            </div>

            <div className="team-member">
              <div className="team-avatar" style={{background: '#820300', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem'}}>
                <GiChefToque />
              </div>
              <h3 className="team-name">Professional Chefs</h3>
              <p className="team-role">Culinary Experts</p>
              <p className="team-bio">
                Experienced chefs sharing professional techniques, restaurant-quality 
                recipes, and industry insights.
              </p>
            </div>

            <div className="team-member">
              <div className="team-avatar" style={{background: '#820300', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem'}}>
                <FaUser />
              </div>
              <h3 className="team-name">Food Bloggers</h3>
              <p className="team-role">Content Creators</p>
              <p className="team-bio">
                Creative individuals sharing beautifully documented recipes, food 
                photography, and culinary stories.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to Start Your Culinary Journey?</h2>
          <p className="cta-description">
            Join thousands of food enthusiasts who are already sharing their kitchen tales
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">
              Join Now
            </Link>
            <Link to="/home" className="cta-button">
              Explore Recipes
            </Link>
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-section">
          <h2 className="about-section-title">Our Mission</h2>
          <div className="about-description">
            <p>
              At Kitchen Tales, we believe that food is more than just sustenance – it's a language 
              that connects people, a art form that expresses creativity, and a science that challenges 
              our skills. Our mission is to create a welcoming space where everyone can:
            </p>
            <ul style={{textAlign: 'left', marginLeft: '2rem', lineHeight: '1.8'}}>
              <li>Share their unique culinary perspectives and family traditions</li>
              <li>Learn from a diverse community of food enthusiasts</li>
              <li>Discover new flavors and cooking techniques</li>
              <li>Build confidence in the kitchen through practice and feedback</li>
              <li>Create lasting memories around the dining table</li>
            </ul>
            <p>
              Whether you're here to find your next favorite recipe, share your grandmother's 
              secret sauce, or simply connect with fellow food lovers, you've found your home 
              in our kitchen community.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}