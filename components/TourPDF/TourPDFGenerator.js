'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import styles from './TourPDF.module.css';

const FingerPointIcon = () => (
    <svg viewBox="0 0 24 24" fill="#c62828" className={styles.bulletIcon} width="16" height="16">
        <path d="M21,7.24a3,3,0,0,0-5.64-1.41l-3.32,6.64A3,3,0,1,1,6.72,9.72L12,4.44l1.41,1.41-5.28,5.28a1,1,0,1,0,1.41,1.41l5.29-5.29A3,3,0,0,1,21,7.24Z" />
        <path d="M18,13a1,1,0,0,1-1-1V8.5a1,1,0,0,1,2,0V12A1,1,0,0,1,18,13Z" />
        <path d="M15,14a1,1,0,0,1-1-1V10.5a1,1,0,0,1,2,0V13A1,1,0,0,1,15,14Z" />
        <path d="M12,15a1,1,0,0,1-1-1V12.5a1,1,0,0,1,2,0V14A1,1,0,0,1,12,15Z" />
    </svg>
);

const getListItems = (value) =>
    String(value || '')
        .split(/\r?\n/)
        .map((item) => item.replace(/^[\s•\-]+/, '').trim())
        .filter(Boolean);

const TourPDFDocument = forwardRef(function TourPDFDocument({ data, compactPreview = false, pdfMode = false }, ref) {
    const {
        perPersonCost,
        totalPax,
        vehicleType,
        hotelCategory,
        mealPlan,
        tourDuration,
        tourDateFrom,
        tourDateTo,
        pickupPoint,
        dropPoint,
        destinations,
        heroMain,
        heroSub1,
        heroSub2,
        hotels,
        flights,
        itinerary,
        accommodationNote,
        flightNote,
        inclusions,
        exclusions,
        paymentPolicy,
        cancellationPolicy,
        termsAndConditions,
        memorableTrip,
        ceoName,
        cell1,
        cell2,
        companyEmail,
        companyWebsite,
    } = data;

    const inclusionItems = getListItems(inclusions);
    const exclusionItems = getListItems(exclusions);
    const paymentPolicyItems = getListItems(paymentPolicy);
    const cancellationPolicyItems = getListItems(cancellationPolicy);
    const termsItems = getListItems(termsAndConditions);
    const uploadedImages = [heroMain, heroSub1, heroSub2].filter(Boolean);
    const allItinerary = Array.isArray(itinerary) ? itinerary : [];
    
    const primaryColor = '#1e3a8a'; // Deep Navy
    const accentColor = '#ef4444'; // Red from logo
    const lightBg = '#f8fafc';
    const borderColor = '#cbd5e1';

    const tripTitle = destinations?.trim()
        ? `Let's Explore ${destinations}`
        : "Let's Explore Your Trip";

    return (
        <div 
          className={`${styles.pdfRoot} ${pdfMode ? styles.pdfMode : ''} pdf-root-print`} 
          ref={ref} 
          id="pdf-document"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#1e293b',
            lineHeight: 1.5
          }}
        >
            {/* Google Fonts Import */}
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Dancing+Script:wght@700&display=swap');
                .pdf-root-print { font-family: 'Inter', sans-serif !important; }
                .signature-text { font-family: 'Dancing Script', cursive !important; }
                .itinerary-day { break-inside: avoid; margin-bottom: 20px; }
            `}} />

            {/* ── PAGE 1: COVER ── */}
            <section style={{ 
              width: '210mm', 
              minHeight: 'auto', 
              padding: '10mm 15mm', 
              boxSizing: 'border-box', 
              background: '#fff',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
                {/* Watermark Logo */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-30deg)',
                    opacity: 0.03,
                    width: '500px',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}>
                    <img src="/Chalo-on-tour.jpg.jpeg" alt="" style={{ width: '100%' }} />
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Header Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                        <div style={{ width: '280px', marginBottom: '20px', textAlign: 'center' }}>
                            <img src="/Chalo-on-tour.jpg.jpeg" alt="Chalo On Tour" style={{ width: '100%', display: 'block', marginBottom: '8px' }} />
                            <div style={{ padding: '4px 12px', background: primaryColor, color: '#fff', fontSize: '8pt', fontWeight: 800, borderRadius: '4px', textAlign: 'center', letterSpacing: '1.5px', display: 'inline-block' }}>
                                THE FUTURE OF TRAVEL
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: '10px 0', width: '100%' }}>
                            <h1 style={{ margin: 0, fontSize: '15pt', fontWeight: 800, color: primaryColor, textTransform: 'uppercase', letterSpacing: '2px' }}>Tour Details</h1>
                        </div>
                    </div>

                    <h2 style={{ fontSize: '28pt', fontWeight: 900, color: '#000', margin: '25px 0 20px', borderLeft: `6px solid ${accentColor}`, paddingLeft: '20px', lineHeight: 1.1 }}>
                        {tripTitle}
                    </h2>

                    {/* Image Showcase */}
                    {uploadedImages.length > 0 && (
                        <div style={{ marginBottom: '25px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: uploadedImages.length > 1 ? '1.5fr 1fr' : '1fr', gap: '15px' }}>
                                <div style={{ height: '350px', borderRadius: '15px', overflow: 'hidden', border: `1px solid ${borderColor}` }}>
                                    <img src={uploadedImages[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Main" />
                                </div>
                                {uploadedImages.length > 1 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ flex: 1, borderRadius: '15px', overflow: 'hidden', border: `1px solid ${borderColor}` }}>
                                            <img src={uploadedImages[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Sub 1" />
                                        </div>
                                        {uploadedImages.length > 2 && (
                                            <div style={{ flex: 1, borderRadius: '15px', overflow: 'hidden', border: `1px solid ${borderColor}` }}>
                                                <img src={uploadedImages[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Sub 2" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Summary Bar */}
                    <div style={{ background: lightBg, color: primaryColor, padding: '18px 25px', borderRadius: '15px', border: `1px solid ${borderColor}`, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '18px' }}>
                        <div>
                            <div style={{ fontSize: '7pt', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>Cost Per Person</div>
                            <div style={{ fontSize: '12pt', fontWeight: 800 }}>{perPersonCost ? `₹ ${Number(perPersonCost).toLocaleString('en-IN')}` : '--'}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '7pt', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>Duration</div>
                            <div style={{ fontSize: '12pt', fontWeight: 800 }}>{tourDuration || '--'}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '7pt', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>Pax Count</div>
                            <div style={{ fontSize: '12pt', fontWeight: 800 }}>{totalPax || '--'}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '7pt', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>Meal Plan</div>
                            <div style={{ fontSize: '12pt', fontWeight: 800 }}>{mealPlan || '--'}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ padding: '15px', border: `1px solid ${borderColor}`, borderRadius: '10px' }}>
                            <span style={{ fontSize: '7pt', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Vehicle Preference</span>
                            <div style={{ fontWeight: 700, marginTop: '2px' }}>{vehicleType || '--'}</div>
                        </div>
                        <div style={{ padding: '15px', border: `1px solid ${borderColor}`, borderRadius: '10px' }}>
                            <span style={{ fontSize: '7pt', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Hotel Class</span>
                            <div style={{ fontWeight: 700, marginTop: '2px' }}>{hotelCategory || '--'}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: ACCOMMODATION & FLIGHTS ── */}
            <section style={{ 
                width: '210mm', 
                minHeight: 'auto', 
                padding: '10mm 15mm', 
                boxSizing: 'border-box', 
                background: '#fff'
            }}>
                <h3 style={{ fontSize: '18pt', fontWeight: 900, color: primaryColor, marginBottom: '12px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', display: 'inline-block' }}>
                    Accommodation Details
                </h3>
                
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${borderColor}`, marginBottom: '15px', breakInside: 'avoid' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: primaryColor, color: '#fff' }}>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '9pt' }}>Sr.</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '9pt' }}>Hotel Name</th>
                                <th style={{ padding: '12px', textAlign: 'center', fontSize: '9pt' }}>Nights</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '9pt' }}>Category</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '9pt' }}>Type</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '9pt' }}>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels?.length > 0 ? hotels.map((h, i) => (
                                <tr key={i} style={{ borderBottom: `1px solid ${borderColor}` }}>
                                    <td style={{ padding: '12px', fontSize: '9pt', color: '#64748b' }}>{i + 1}</td>
                                    <td style={{ padding: '12px', fontWeight: 700, fontSize: '10pt' }}>{h.name}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '9.5pt' }}>{h.nights}</td>
                                    <td style={{ padding: '12px', fontSize: '9.5pt' }}>{h.roomCategory}</td>
                                    <td style={{ padding: '12px', fontSize: '9.5pt' }}>{h.roomSharing}</td>
                                    <td style={{ padding: '12px', fontSize: '9.5pt', fontWeight: 600 }}>{h.destination}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No accommodation listed</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {accommodationNote && <p style={{ fontSize: '8.5pt', color: '#64748b', fontStyle: 'italic', marginBottom: '15px' }}>* {accommodationNote}</p>}

                {flights?.length > 0 && (
                    <>
                        <h3 style={{ fontSize: '18pt', fontWeight: 900, color: primaryColor, marginBottom: '12px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', display: 'inline-block', marginTop: '10px' }}>
                            Flight Itinerary
                        </h3>
                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${borderColor}`, marginBottom: '12px', breakInside: 'avoid' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f1f5f9' }}>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '9pt', color: primaryColor }}>Route</th>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '9pt', color: primaryColor }}>Details</th>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '9pt', color: primaryColor }}>Airline</th>
                                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '9pt', color: primaryColor }}>PNR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flights.map((f, i) => (
                                        <tr key={i} style={{ borderBottom: `1px solid ${borderColor}` }}>
                                            <td style={{ padding: '12px' }}>
                                                <div style={{ fontWeight: 700, fontSize: '10pt' }}>{f.from} → {f.to}</div>
                                            </td>
                                            <td style={{ padding: '12px', fontSize: '9pt', color: '#475569' }}>
                                                {f.depDate} {f.depTime}
                                            </td>
                                            <td style={{ padding: '12px', fontSize: '9pt' }}>
                                                <div style={{ fontWeight: 600 }}>{f.airline}</div>
                                                <div style={{ fontSize: '8pt', opacity: 0.7 }}>{f.flightNo}</div>
                                            </td>
                                            <td style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: accentColor }}>{f.pnr}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {flightNote && <p style={{ fontSize: '8.5pt', color: '#64748b', fontStyle: 'italic' }}>* {flightNote}</p>}
                    </>
                )}
            </section>

            {/* ── SECTION 3: ITINERARY ── */}
            <section style={{ 
                width: '210mm', 
                minHeight: 'auto', 
                padding: '10mm 15mm', 
                boxSizing: 'border-box', 
                background: '#fff' 
            }}>
                <h3 style={{ fontSize: '18pt', fontWeight: 900, color: primaryColor, marginBottom: '12px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '6px', display: 'inline-block' }}>
                    Days of Wonder
                </h3>

                {allItinerary.map((day, di) => (
                    <div key={di} className="itinerary-day" style={{ marginBottom: '15px', borderLeft: `3px solid ${di % 2 === 0 ? primaryColor : borderColor}`, paddingLeft: '20px', breakInside: 'avoid' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ background: primaryColor, color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '9pt', fontWeight: 800 }}>
                                {day.dayLabel || `DAY ${di + 1}`}
                            </div>
                            {day.date && <div style={{ fontSize: '9pt', color: '#64748b', fontWeight: 600 }}>{day.date}</div>}
                        </div>
                        <h4 style={{ fontSize: '14pt', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>{day.title}</h4>
                        <p style={{ fontSize: '10pt', color: '#475569', lineHeight: 1.6, marginBottom: '15px' }}>{day.description}</p>
                        
                        {day.places?.length > 0 && (
                            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
                                <div style={{ fontSize: '8pt', fontWeight: 800, color: accentColor, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Highlights:</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
                                    {day.places.filter(Boolean).map((place, pi) => (
                                        <div key={pi} style={{ fontSize: '9pt', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }}></div>
                                          {place}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <section style={{ 
                width: '210mm', 
                minHeight: 'auto', 
                padding: '8mm 15mm', 
                boxSizing: 'border-box', 
                background: '#fff', 
                display: 'flex', 
                flexDirection: 'column' 
            }}>
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '15px', breakInside: 'avoid' }}>
                        {inclusionItems.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: '11pt', fontWeight: 800, color: primaryColor, textTransform: 'uppercase', marginBottom: '15px' }}>Package Inclusions</h4>
                                {inclusionItems.map((item, i) => (
                                    <div key={i} style={{ fontSize: '9pt', color: '#445566', marginBottom: '8px', display: 'flex', gap: '10px' }}>
                                        <span style={{ color: '#16a34a', fontWeight: 900 }}>✓</span> {item}
                                    </div>
                                ))}
                            </div>
                        )}
                        {exclusionItems.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: '11pt', fontWeight: 800, color: accentColor, textTransform: 'uppercase', marginBottom: '15px' }}>Package Exclusions</h4>
                                {exclusionItems.map((item, i) => (
                                    <div key={i} style={{ fontSize: '9pt', color: '#445566', marginBottom: '8px', display: 'flex', gap: '10px' }}>
                                        <span style={{ color: accentColor, fontWeight: 900 }}>✕</span> {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ background: lightBg, padding: '15px 25px', borderRadius: '15px', border: `1px solid ${borderColor}`, marginBottom: '15px', breakInside: 'avoid' }}>
                        <h4 style={{ fontSize: '11pt', fontWeight: 800, color: primaryColor, textTransform: 'uppercase', marginBottom: '15px' }}>Terms & Policies</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            <div>
                                <h5 style={{ fontSize: '8pt', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Payment Schedule</h5>
                                {paymentPolicyItems.map((item, i) => <p key={i} style={{ fontSize: '8.5pt', marginBottom: '5px' }}>• {item}</p>)}
                            </div>
                            <div>
                                <h5 style={{ fontSize: '8pt', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Cancellation Terms</h5>
                                {cancellationPolicyItems.map((item, i) => <p key={i} style={{ fontSize: '8.5pt', marginBottom: '5px' }}>• {item}</p>)}
                            </div>
                        </div>
                    </div>

                    {memorableTrip && (
                        <div style={{ background: '#fffef3', border: '1px solid #fde68a', padding: '15px', borderRadius: '12px', marginBottom: '25px' }}>
                            <div style={{ fontWeight: 800, color: '#92400e', fontSize: '10pt', marginBottom: '5px' }}>Tip for a Memorable Trip:</div>
                            <p style={{ fontSize: '9.5pt', color: '#78350f', margin: 0, lineHeight: 1.5 }}>{memorableTrip}</p>
                        </div>
                    )}
                </div>

                {/* SIGNATOR & CONTACT */}
                <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: '13pt', color: primaryColor, marginBottom: '3px' }}>CHALO ON TOUR</div>
                            <div style={{ fontSize: '10pt', fontWeight: 800, marginBottom: '6px' }}>{ceoName || 'Mr. Utkarsh Kale (C.E.O.)'}</div>
                            <div style={{ fontSize: '9pt', color: '#475569', marginBottom: '2px' }}><strong>Ph:</strong> {cell1} / {cell2}</div>
                            <div style={{ fontSize: '9pt', color: '#475569', marginBottom: '2px' }}><strong>Email:</strong> {companyEmail}</div>
                            <div style={{ fontSize: '9pt', color: '#475569' }}><strong>Web:</strong> {companyWebsite}</div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '8pt', color: '#94a3b8' }}>
                         Registered Office: Near Police Station, Ghodegaon, Tal- Ambegaon, Dist Pune | www.chaloontour.com
                         <div style={{ marginTop: '6px', fontStyle: 'italic', opacity: 0.5 }}>*** This is a system-generated document. Digital Verification Active. ***</div>
                    </div>
                </div>
            </section>
        </div>
    );
});

export default TourPDFDocument;
