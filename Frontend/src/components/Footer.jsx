import React, { useState } from 'react';

const Footer = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Data arrays
  const aboutLinks = [
    { label: 'Contact Us', icon: '📞' },
    { label: 'About Us', icon: '🏢' },
    { label: 'Careers', icon: '💼' },
    { label: 'SuperMarket Stories', icon: '📖' },
    { label: 'Press', icon: '📰' },
    { label: 'Corporate Information', icon: 'ℹ️' }
  ];

  const groupCompanies = [
    { label: 'Myntra', icon: '👗', color: '#ff3f6c' },
    { label: 'Cleartrip', icon: '✈️', color: '#ff6900' },
    { label: 'Shopsy', icon: '🛒', color: '#2874f0' }
  ];

  const helpLinks = [
    { label: 'Payments', icon: '💳' },
    { label: 'Shipping', icon: '📦' },
    { label: 'Cancellation & Returns', icon: '↩️' },
    { label: 'FAQ', icon: '❓' }
  ];

  const consumerPolicyLinks = [
    { label: 'Cancellation & Returns', icon: '📋' },
    { label: 'Terms Of Use', icon: '📄' },
    { label: 'Security', icon: '🔒' },
    { label: 'Privacy', icon: '🛡️' },
    { label: 'Sitemap', icon: '🗺️' },
    { label: 'Grievance Redressal', icon: '⚖️' },
    { label: 'EPR Compliance', icon: '♻️' }
  ];

  const bottomLinks = [
    { icon: '🏪', text: 'Become a Seller', color: '#2874f0' },
    { icon: '📢', text: 'Advertise', color: '#ff6900' },
    { icon: '🎁', text: 'Gift Cards', color: '#ff3f6c' },
    { icon: '🆘', text: 'Help Center', color: '#388e3c' }
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: '📘', url: '#', color: '#1877f2' },
    { platform: 'Twitter', icon: '🐦', url: '#', color: '#1da1f2' },
    { platform: 'YouTube', icon: '📺', url: '#', color: '#ff0000' },
    { platform: 'Instagram', icon: '📷', url: '#', color: '#e4405f' },
    { platform: 'LinkedIn', icon: '💼', url: '#', color: '#0077b5' }
  ];

  const paymentMethods = [
    { name: 'Visa', src: 'https://img.icons8.com/color/36/000000/visa.png' },
    { name: 'Mastercard', src: 'https://img.icons8.com/color/36/000000/mastercard-logo.png' },
    { name: 'American Express', src: 'https://img.icons8.com/color/36/000000/amex.png' },
    { name: 'Discover', src: 'https://img.icons8.com/color/36/000000/discover.png' },
    { name: 'RuPay', src: 'https://img.icons8.com/color/36/000000/rupay.png' },
    { name: 'UPI', src: 'https://img.icons8.com/color/36/000000/google-pay.png' }
  ];

  // Styles
  const footerStyles = {
    background: 'linear-gradient(135deg, #172337 0%, #1e2a42 50%, #172337 100%)',
    color: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    width: '100vw',
    position: 'relative',
    overflow: 'hidden'
  };

  const decorativeBackground = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(40, 116, 240, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 63, 108, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(255, 105, 0, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none'
  };

  const mainContentStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px',
    padding: '48px 40px 32px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    zIndex: 2
  };

  const sectionStyles = (isHovered) => ({
    minWidth: '200px',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    backdropFilter: isHovered ? 'blur(10px)' : 'none',
    border: isHovered ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent'
  });

  const sectionTitleStyles = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#a0a0a0',
    marginBottom: '16px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    position: 'relative'
  };

  const linkStyles = (isHovered, customColor) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    lineHeight: '1.8',
    cursor: 'pointer',
    padding: '6px 0',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    color: isHovered ? (customColor || '#2874f0') : '#ffffff',
    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
  });

  const addressStyles = {
    fontSize: '13px',
    lineHeight: '1.7',
    color: '#cccccc',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const bottomSectionStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 40px',
    fontSize: '14px',
    gap: '24px',
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)'
  };

  const bottomLinksStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '32px'
  };

  const bottomLinkStyles = (isHovered, color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    color: isHovered ? color : '#ffffff',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
  });

  const socialIconStyles = (isHovered, color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: isHovered ? color : 'rgba(255, 255, 255, 0.1)',
    color: isHovered ? '#ffffff' : color,
    fontSize: '18px',
    textDecoration: 'none',
    margin: '0 6px',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-2px) scale(1.1)' : 'translateY(0) scale(1)',
    boxShadow: isHovered ? `0 8px 20px ${color}40` : '0 2px 8px rgba(0, 0, 0, 0.2)'
  });

  const paymentIconStyles = {
    width: '40px',
    height: '40px',
    margin: '0 4px',
    borderRadius: '6px',
    padding: '2px',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  const copyrightStyles = {
    color: '#a0a0a0',
    fontSize: '13px',
    fontWeight: '400'
  };

  // Responsive styles
  const mobileStyles = `
    @media (max-width: 768px) {
      .footer-main-content {
        grid-template-columns: 1fr;
        padding: 32px 20px !important;
        gap: 24px !important;
      }
      
      .footer-bottom {
        flex-direction: column;
        align-items: flex-start !important;
        padding: 20px !important;
        gap: 16px !important;
      }
      
      .footer-bottom-links {
        flex-direction: column;
        gap: 16px !important;
      }
      
      .footer-payment-methods {
        align-self: stretch;
        justify-content: center;
      }
    }
    
    @media (max-width: 480px) {
      .footer-section {
        padding: 16px 12px !important;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <footer style={footerStyles}>
        <div style={decorativeBackground}></div>
        
        <div className="footer-main-content" style={mainContentStyles}>
          {/* About Section */}
          <div 
            style={sectionStyles(hoveredSection === 'about')}
            onMouseEnter={() => setHoveredSection('about')}
            onMouseLeave={() => setHoveredSection(null)}
            className="footer-section"
          >
            <h4 style={sectionTitleStyles}>
              About
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: hoveredSection === 'about' ? '100%' : '20px',
                height: '2px',
                background: 'linear-gradient(90deg, #2874f0, #ff3f6c)',
                borderRadius: '1px',
                transition: 'width 0.3s ease'
              }}></div>
            </h4>
            <div>
              {aboutLinks.map((link, index) => (
                <div 
                  key={index}
                  style={linkStyles(hoveredLink === `about-${index}`)}
                  onMouseEnter={() => setHoveredLink(`about-${index}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => console.log(`Navigate to ${link.label}`)}
                >
                  <span style={{ fontSize: '16px' }}>{link.icon}</span>
                  {link.label}
                </div>
              ))}
            </div>
          </div>

          {/* Group Companies Section */}
          <div 
            style={sectionStyles(hoveredSection === 'companies')}
            onMouseEnter={() => setHoveredSection('companies')}
            onMouseLeave={() => setHoveredSection(null)}
            className="footer-section"
          >
            <h4 style={sectionTitleStyles}>
              Group Companies
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: hoveredSection === 'companies' ? '100%' : '20px',
                height: '2px',
                background: 'linear-gradient(90deg, #ff6900, #2874f0)',
                borderRadius: '1px',
                transition: 'width 0.3s ease'
              }}></div>
            </h4>
            <div>
              {groupCompanies.map((company, index) => (
                <div 
                  key={index}
                  style={linkStyles(hoveredLink === `company-${index}`, company.color)}
                  onMouseEnter={() => setHoveredLink(`company-${index}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => console.log(`Navigate to ${company.label}`)}
                >
                  <span style={{ fontSize: '16px' }}>{company.icon}</span>
                  {company.label}
                </div>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div 
            style={sectionStyles(hoveredSection === 'help')}
            onMouseEnter={() => setHoveredSection('help')}
            onMouseLeave={() => setHoveredSection(null)}
            className="footer-section"
          >
            <h4 style={sectionTitleStyles}>
              Help
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: hoveredSection === 'help' ? '100%' : '20px',
                height: '2px',
                background: 'linear-gradient(90deg, #388e3c, #ff6900)',
                borderRadius: '1px',
                transition: 'width 0.3s ease'
              }}></div>
            </h4>
            <div>
              {helpLinks.map((link, index) => (
                <div 
                  key={index}
                  style={linkStyles(hoveredLink === `help-${index}`)}
                  onMouseEnter={() => setHoveredLink(`help-${index}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => console.log(`Navigate to ${link.label}`)}
                >
                  <span style={{ fontSize: '16px' }}>{link.icon}</span>
                  {link.label}
                </div>
              ))}
            </div>
          </div>

          {/* Consumer Policy Section */}
          <div 
            style={sectionStyles(hoveredSection === 'policy')}
            onMouseEnter={() => setHoveredSection('policy')}
            onMouseLeave={() => setHoveredSection(null)}
            className="footer-section"
          >
            <h4 style={sectionTitleStyles}>
              Consumer Policy
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: hoveredSection === 'policy' ? '100%' : '20px',
                height: '2px',
                background: 'linear-gradient(90deg, #ff3f6c, #388e3c)',
                borderRadius: '1px',
                transition: 'width 0.3s ease'
              }}></div>
            </h4>
            <div>
              {consumerPolicyLinks.map((link, index) => (
                <div 
                  key={index}
                  style={linkStyles(hoveredLink === `policy-${index}`)}
                  onMouseEnter={() => setHoveredLink(`policy-${index}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => console.log(`Navigate to ${link.label}`)}
                >
                  <span style={{ fontSize: '16px' }}>{link.icon}</span>
                  {link.label}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div 
            style={sectionStyles(hoveredSection === 'contact')}
            onMouseEnter={() => setHoveredSection('contact')}
            onMouseLeave={() => setHoveredSection(null)}
            className="footer-section"
          >
            <h4 style={sectionTitleStyles}>
              Mail Us
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: hoveredSection === 'contact' ? '100%' : '20px',
                height: '2px',
                background: 'linear-gradient(90deg, #2874f0, #ff3f6c)',
                borderRadius: '1px',
                transition: 'width 0.3s ease'
              }}></div>
            </h4>
            <div style={addressStyles}>
              <strong>SuperMarket Internet Private Limited</strong><br />
              Buildings Alyssa, Begonia & Clove<br />
              Embassy Tech Village<br />
              Outer Ring Road, Devarabeesanahalli Village<br />
              Bengaluru, 560103, Karnataka, India
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <span style={{ fontSize: '14px', color: '#a0a0a0', marginBottom: '12px', display: 'block' }}>
                Connect With Us
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    style={socialIconStyles(hoveredLink === `social-${index}`, social.color)}
                    onMouseEnter={() => setHoveredLink(`social-${index}`)}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={(e) => { e.preventDefault(); console.log(`Navigate to ${social.platform}`); }}
                    title={social.platform}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Registered Office Section */}
          <div 
            style={sectionStyles(hoveredSection === 'office')}
            onMouseEnter={() => setHoveredSection('office')}
            onMouseLeave={() => setHoveredSection(null)}
            className="footer-section"
          >
            <h4 style={sectionTitleStyles}>
              Registered Office
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: hoveredSection === 'office' ? '100%' : '20px',
                height: '2px',
                background: 'linear-gradient(90deg, #ff6900, #388e3c)',
                borderRadius: '1px',
                transition: 'width 0.3s ease'
              }}></div>
            </h4>
            <div style={addressStyles}>
              <strong>SuperMarket Internet Private Limited</strong><br />
              Buildings Alyssa, Begonia & Clove<br />
              Embassy Tech Village<br />
              Outer Ring Road, Devarabeesanahalli Village<br />
              Bengaluru, 560103, Karnataka, India<br />
              <br />
              <strong>CIN:</strong> U51109KA2012PTC066107<br />
              <strong>Phone:</strong> 
              <a href="tel:044-45614700" style={{ color: '#2874f0', textDecoration: 'none' }}> 044-45614700</a> / 
              <a href="tel:044-67415800" style={{ color: '#2874f0', textDecoration: 'none' }}> 044-67415800</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom" style={bottomSectionStyles}>
          <div className="footer-bottom-links" style={bottomLinksStyles}>
            {bottomLinks.map((link, index) => (
              <div 
                key={index}
                style={bottomLinkStyles(hoveredLink === `bottom-${index}`, link.color)}
                onMouseEnter={() => setHoveredLink(`bottom-${index}`)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => console.log(`Navigate to ${link.text}`)}
              >
                <span style={{ fontSize: '20px' }}>{link.icon}</span>
                <span style={{ fontWeight: '500' }}>{link.text}</span>
              </div>
            ))}
          </div>
          
          <div style={copyrightStyles}>
            © 2007-2025 SuperMarket.com
          </div>
          
          <div className="footer-payment-methods" style={{ 
            display: 'flex', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span style={{ fontSize: '12px', color: '#a0a0a0', marginRight: '12px' }}>
              We Accept:
            </span>
            {paymentMethods.map((method, index) => (
              <img 
                key={index}
                src={method.src} 
                alt={method.name}
                title={method.name}
                style={{
                  ...paymentIconStyles,
                  transform: hoveredLink === `payment-${index}` ? 'scale(1.1)' : 'scale(1)'
                }}
                onMouseEnter={() => setHoveredLink(`payment-${index}`)}
                onMouseLeave={() => setHoveredLink(null)}
              />
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;