package FitnessApplication.FitnessApp.queries;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

// Scheduler that decrements membership days for all users(gym members) every 24 hours
@Component
public class MembershipExpirationScheduler {


    @PersistenceContext
    private EntityManager entityManager;


    @Scheduled(fixedRate = 86400000) // Every 24 hours
    @Transactional
    public void decrementMembershipDays() {
        // Using  native SQL query to decrement membership_days for all users
        String nativeQuery = "UPDATE users SET membership_days = membership_days - 1 WHERE membership_days > 0";
        Query query = entityManager.createNativeQuery(nativeQuery);
        int updatedRows = query.executeUpdate();

        System.out.println("Decremented membership days for: " + updatedRows + " members.");

        };
    }



